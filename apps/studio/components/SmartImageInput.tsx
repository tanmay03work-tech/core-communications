import React, { useState, useCallback } from 'react';
import { ObjectInputProps, set, unset, useClient } from 'sanity';
import { Card, Stack, Text, Button, Flex, Box, Badge, Spinner } from '@sanity/ui';
import { compressImageFile, CompressionResult } from '../utils/imageCompressor';

export function SmartImageInput(props: ObjectInputProps) {
  const client = useClient({ apiVersion: '2023-01-01' });
  const { onChange, value, renderDefault } = props;

  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lastAttemptedFile, setLastAttemptedFile] = useState<File | null>(null);

  // Helper function to handle direct file upload with auto-compression
  const handleFileUpload = useCallback(
    async (file: File, forceAggressiveCompression = false) => {
      setIsUploading(true);
      setErrorMessage(null);
      setLastAttemptedFile(file);

      try {
        setUploadStatus('Checking file size & dimensions...');
        const originalMB = (file.size / (1024 * 1024)).toFixed(1);

        // Perform client-side compression
        setUploadStatus(`Optimizing ${file.name} (${originalMB} MB)...`);
        const result: CompressionResult = await compressImageFile(file, {
          maxWidth: forceAggressiveCompression ? 1920 : 2560,
          maxHeight: forceAggressiveCompression ? 3072 : 4096,
          quality: forceAggressiveCompression ? 0.75 : 0.85,
          maxSizeMB: 2,
        });

        const finalMB = (result.file.size / (1024 * 1024)).toFixed(1);
        if (result.wasCompressed) {
          setUploadStatus(`Uploading optimized image (${originalMB} MB → ${finalMB} MB)...`);
        } else {
          setUploadStatus(`Uploading image (${finalMB} MB)...`);
        }

        // Upload to Sanity Assets API
        const assetDocument = await client.assets.upload('image', result.file, {
          filename: result.file.name,
          contentType: result.file.type,
        });

        // Set the image reference field value
        onChange(
          set({
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetDocument._id,
            },
          })
        );

        setUploadStatus(`✅ Upload successful! (${finalMB} MB)`);
        setTimeout(() => setUploadStatus(null), 4000);
      } catch (err: any) {
        console.error('SmartImageInput upload error:', err);
        const errStr = err?.message || String(err);
        let userFriendlyError = 'Upload failed due to a network connection timeout or server error.';

        if (errStr.includes('isNetworkError') || errStr.includes('Failed to fetch') || errStr.includes('network')) {
          userFriendlyError = 'Network timeout / CORS block. The file size might be too large for your current connection.';
        }

        setErrorMessage(userFriendlyError);
        setUploadStatus(null);
      } finally {
        setIsUploading(false);
      }
    },
    [client, onChange]
  );

  // File input change handler
  const onFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        handleFileUpload(selectedFile);
      }
    },
    [handleFileUpload]
  );

  return (
    <Stack space={3}>
      {/* Render Sanity Default Image Input (Dropzone, Crop, Hotspot) */}
      {renderDefault(props)}

      {/* Smart Infographic & High-Res Upload Toolbar */}
      <Card padding={3} radius={2} shadow={1} tone="transparent">
        <Stack space={3}>
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={2}>
              <Text weight="semibold" size={1}>⚡ High-Res Infographic Auto-Optimizer</Text>
              <Badge tone="positive" fontSize={0}>Auto-Compress Enabled</Badge>
            </Flex>
          </Flex>

          <Text size={1} muted>
            Uploading heavy infographics (10MB+)? Select your file below to auto-compress and prevent network timeout errors.
          </Text>

          <Flex gap={2} wrap="wrap" align="center">
            <Button
              as="label"
              mode="default"
              tone="primary"
              text={isUploading ? 'Optimizing...' : 'Upload High-Res Infographic'}
              disabled={isUploading}
              fontSize={1}
            >
              <input
                type="file"
                accept="image/*"
                onChange={onFileSelect}
                style={{ display: 'none' }}
                disabled={isUploading}
              />
            </Button>

            {isUploading && (
              <Flex align="center" gap={2}>
                <Spinner size={1} />
                <Text size={1} weight="medium">{uploadStatus}</Text>
              </Flex>
            )}
          </Flex>

          {/* Success Status Banner */}
          {uploadStatus && !isUploading && uploadStatus.startsWith('✅') && (
            <Card padding={2} tone="positive" radius={2}>
              <Text size={1}>{uploadStatus}</Text>
            </Card>
          )}

          {/* Fallback Error Handling Banner */}
          {errorMessage && (
            <Card padding={3} tone="critical" radius={2}>
              <Stack space={2}>
                <Text size={1} weight="bold">⚠️ Upload Error Notice</Text>
                <Text size={1}>{errorMessage}</Text>

                {lastAttemptedFile && (
                  <Flex gap={2} marginTop={1}>
                    <Button
                      size={1}
                      tone="caution"
                      text="⚡ Compress & Retry Upload (High Quality WebP)"
                      onClick={() => handleFileUpload(lastAttemptedFile, true)}
                    />
                  </Flex>
                )}
              </Stack>
            </Card>
          )}
        </Stack>
      </Card>
    </Stack>
  );
}
