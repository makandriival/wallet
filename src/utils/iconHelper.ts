/**
 * Helper functions for generating transaction icons
 */

// Map of known brands to their FontAwesome icons and colors
const brandIcons: Record<string, { iconClass: string; bgColor: string; isBrand?: boolean }> = {
  'apple': { iconClass: 'fa-apple', bgColor: 'bg-gray-900', isBrand: true },
  'amazon': { iconClass: 'fa-amazon', bgColor: 'bg-orange-500', isBrand: true },
  'starbucks': { iconClass: 'fa-mug-hot', bgColor: 'bg-green-700' },
  'target': { iconClass: 'fa-bullseye', bgColor: 'bg-red-600' },
  'ikea': { iconClass: 'fa-couch', bgColor: 'bg-blue-700' },
  'payment': { iconClass: 'fa-building-columns', bgColor: 'bg-green-600' },
  'walmart': { iconClass: 'fa-cart-shopping', bgColor: 'bg-blue-600' },
  'costco': { iconClass: 'fa-warehouse', bgColor: 'bg-red-700' },
  'google': { iconClass: 'fa-google', bgColor: 'bg-blue-500', isBrand: true },
  'netflix': { iconClass: 'fa-film', bgColor: 'bg-red-600' },
  'spotify': { iconClass: 'fa-spotify', bgColor: 'bg-green-500', isBrand: true },
};

const defaultIcons = [
  'fa-store',
  'fa-shopping-cart',
  'fa-credit-card',
  'fa-receipt',
];

const defaultColors = [
  'bg-gray-800',
  'bg-gray-700',
  'bg-slate-800',
  'bg-zinc-800',
];

export function getIconForTransaction(name: string): { iconClass: string; bgColor: string; isBrand: boolean } {
  const nameLower = name.toLowerCase();
  
  // Check if we have a specific icon for this brand
  if (brandIcons[nameLower]) {
    return {
      iconClass: brandIcons[nameLower].iconClass,
      bgColor: brandIcons[nameLower].bgColor,
      isBrand: brandIcons[nameLower].isBrand || false,
    };
  }
  
  // For unknown brands, use a hash-based fallback
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const iconIndex = Math.abs(hash) % defaultIcons.length;
  const colorIndex = Math.abs(hash) % defaultColors.length;
  
  return {
    iconClass: defaultIcons[iconIndex],
    bgColor: defaultColors[colorIndex],
    isBrand: false,
  };
}
