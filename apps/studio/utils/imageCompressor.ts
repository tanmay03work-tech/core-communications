/**
 * High-Performance Client-Side Image & Infographic Compressor
 * Automatically resizes & compresses large image files (infographics, ultra-high-res PNGs)
 * in the browser before sending to Sanity API.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeMB?: number;
  mimeType?: 'image/webp' | 'image/jpeg' | 'image/png';
}

export interface CompressionResult {
  file: File;
  originalSize: number;
  compressedSize: number;
  dimensions: { width: number; height: number };
  wasCompressed: boolean;
}

export async function compressImageFile(
  file: File,
  options: CompressionOptions = {}
): Promise<CompressionResult> {
  const {
    maxWidth = 2560,
    maxHeight = 4096,
    quality = 0.85,
    maxSizeMB = 4,
    mimeType = file.type === 'image/png' ? 'image/png' : 'image/webp',
  } = options;

  const originalSize = file.size;

  // If file is already under maxSizeMB and NOT PNG > 6MB, skip compression unless requested
  const isLarge = file.size > maxSizeMB * 1024 * 1024;
  if (!isLarge && file.type !== 'image/png') {
    return {
      file,
      originalSize,
      compressedSize: originalSize,
      dimensions: { width: 0, height: 0 },
      wasCompressed: false,
    };
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let { width, height } = img;

        // Calculate aspect-ratio scaling for large infographics
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to original if canvas context unavailable
          resolve({
            file,
            originalSize,
            compressedSize: originalSize,
            dimensions: { width: img.width, height: img.height },
            wasCompressed: false,
          });
          return;
        }

        // Apply smooth canvas image scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to optimized blob
        const targetMime = file.size > 8 * 1024 * 1024 ? 'image/webp' : mimeType;
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= originalSize) {
              // If canvas compression didn't shrink size, return original file
              resolve({
                file,
                originalSize,
                compressedSize: originalSize,
                dimensions: { width, height },
                wasCompressed: false,
              });
              return;
            }

            // Create compressed File object with original name
            const ext = targetMime === 'image/webp' ? '.webp' : targetMime === 'image/jpeg' ? '.jpg' : '.png';
            const cleanName = file.name.replace(/\.[^/.]+$/, '') + ext;
            const compressedFile = new File([blob], cleanName, {
              type: targetMime,
              lastModified: Date.now(),
            });

            resolve({
              file: compressedFile,
              originalSize,
              compressedSize: blob.size,
              dimensions: { width, height },
              wasCompressed: true,
            });
          },
          targetMime,
          quality
        );
      };

      img.onerror = (err) => {
        console.warn('Failed to load image for client-side compression:', err);
        resolve({
          file,
          originalSize,
          compressedSize: originalSize,
          dimensions: { width: 0, height: 0 },
          wasCompressed: false,
        });
      };
    };

    reader.onerror = (err) => {
      console.warn('FileReader error:', err);
      resolve({
        file,
        originalSize,
        compressedSize: originalSize,
        dimensions: { width: 0, height: 0 },
        wasCompressed: false,
      });
    };
  });
}
