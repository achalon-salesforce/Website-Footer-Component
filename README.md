# Website Footer Component for Salesforce Experience Cloud

A customizable footer component for Salesforce Experience Cloud sites that seamlessly integrates with Experience Cloud's navigation menus and branding sets. This component provides a professional and configurable footer section with support for contact information, social media links, navigation menus, and copyright information.

## Features

- Fully responsive design that automatically adapts to Experience Cloud themes
- Seamlessly inherits colors and styling from your Experience Cloud branding sets
- Dual navigation menu support (main footer and copyright section) with hierarchical structure
- Social media integration
- Contact information display
- Optional theme color overrides for custom styling
- Theme-aware with override capabilities

## Installation

1. Deploy the component to your Salesforce org using your preferred deployment method
2. Required components (included in package):
   - `NavigationLinkSetPickList` (Apex Class)
   - `NavigationMenuItemsController` (Apex Class)
   - `websiteFooter` (LWC Component)
   - `websiteFooterItem` (LWC Component)

## Usage

### Adding to Experience Cloud Page

1. Edit your Experience Cloud page
2. Drag the "Website Footer" component onto your page
3. Configure the component properties in the property panel
4. Save and publish your changes

### Navigation Menu Setup

1. Create navigation menus in Experience Cloud:
   - One for the main footer section
   - One for the copyright section (optional)
2. Select these menus in the component configuration

## Configurable Properties

- **Content Maximum Width** (String)
  - Maximum width of the footer content (e.g., 1280px, 100%)

- **Override Theme Background Color** (Boolean)
  - Check to use custom background color instead of theme color

- **Background Color** (Color)
  - Custom background color (only applies if override is checked)

- **Override Theme Bottom Bar Color** (Boolean)
  - Check to use custom bottom bar color instead of theme color

- **Bottom Bar Color** (Color)
  - Custom bottom bar color (only applies if override is checked)

- **Override Theme Text Color** (Boolean)
  - Check to use custom text color instead of theme color

- **Text Color** (Color)
  - Custom text color (only applies if override is checked)

- **Address Line 1** (String)
  - First line of the address

- **Address Line 2** (String)
  - Second line of the address (optional)

- **City** (String)
  - City name for the address

- **State** (String)
  - State for the address

- **Zip Code** (String)
  - Postal code for the address

- **Phone Number** (String)
  - Contact phone number

- **Copyright Text** (String)
  - Copyright notice text

- **Footer Navigation Menu** (String)
  - The name of the Navigation Menu Linkset for the main footer section. Note: While all navigation menus across sites are shown, only select a navigation menu that shows your site name in parentheses, as others will not work.

- **Copyright Navigation Menu** (String)
  - The name of the Navigation Menu Linkset for the copyright section. Note: While all navigation menus across sites are shown, only select a navigation menu that shows your site name in parentheses, as others will not work.

- **Instagram URL** (String)
  - URL for the company Instagram profile

- **Twitter URL** (String)
  - URL for the company Twitter profile

- **Facebook URL** (String)
  - URL for the company Facebook profile

- **LinkedIn URL** (String)
  - URL for the company LinkedIn profile

## Customization & Styling

### Theme Integration
The footer automatically inherits colors from your Experience Cloud theme:
- Background color
- Text color
- Bottom bar color

### Custom Styling
You can override theme colors using the component properties:
1. Enable the respective override toggle
2. Select your custom color
3. Changes will apply immediately

## Dependencies & Requirements

- Salesforce Experience Cloud
- Navigation Menus must be created and published
- Proper setup of Experience Cloud branding sets (for theme integration)

## Troubleshooting

### Common Issues

1. **Navigation Menu Items Not Appearing**
   - Ensure the logged-in user has access to the `NavigationMenuItemsController` Apex class
   - Verify selected navigation menu belongs to current site
   - Check that menu names match exactly

2. **Navigation Menu Layout Tips**
   - For best visual results, structure your navigation menus using parent labels with child menu items
   - This hierarchical approach creates a more organized and visually appealing footer layout

### Best Practices

1. Use site-specific navigation menus (indicated by site name in parentheses)
2. Test responsiveness at different screen sizes
3. Keep copyright text concise for better mobile display

## Support

For issues or questions, please create a GitHub issue.