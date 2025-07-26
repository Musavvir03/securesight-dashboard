# Images Directory

This directory contains placeholder images for incident thumbnails.

## Placeholder Images

The following images are referenced in the seed data:
- `incident-1.jpg` through `incident-12.jpg`

For the demo, these are represented as placeholder divs in the UI. In a real implementation, these would be actual CCTV thumbnail images.

## Usage

The incident thumbnails are displayed in the IncidentList component. Currently, they show as gray placeholder boxes with "IMG" text.

To add real images:
1. Add actual image files to this directory
2. Update the seed.ts file to reference the correct image paths
3. Update the IncidentList component to display actual images instead of placeholders 