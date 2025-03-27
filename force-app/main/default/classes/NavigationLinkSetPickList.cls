global class NavigationLinkSetPickList extends VisualEditor.DynamicPickList {
    global override VisualEditor.DataRow getDefaultValue() {
        System.debug('=== Starting getDefaultValue() ===');
        
        List<NavigationLinkSet> defaultNav = [
            SELECT MasterLabel, DeveloperName, Network.Name
            FROM NavigationLinkSet 
            WHERE MasterLabel = 'Default Navigation'
            LIMIT 1
        ];
        
        System.debug('Default Nav Query results: ' + defaultNav);
        
        if (!defaultNav.isEmpty()) {
            String label = defaultNav[0].MasterLabel;
            if (defaultNav[0].Network?.Name != null) {
                label += ' (' + defaultNav[0].Network.Name + ')';
            }
            return new VisualEditor.DataRow(
                label,
                defaultNav[0].DeveloperName
            );
        }
        return new VisualEditor.DataRow('Default Navigation', 'Default_Navigation');
    }

    global override VisualEditor.DynamicPickListRows getValues() {
        System.debug('=== Starting getValues() ===');
        
        VisualEditor.DynamicPickListRows picklistValues = new VisualEditor.DynamicPickListRows();
        
        List<NavigationLinkSet> navigationLinkSetList = [
            SELECT MasterLabel, DeveloperName, Network.Name
            FROM NavigationLinkSet
        ];
        
        System.debug('Navigation List Query results: ' + navigationLinkSetList);
        
        for (NavigationLinkSet navigationLinkSet : navigationLinkSetList) {
            String label = navigationLinkSet.MasterLabel;
            if (navigationLinkSet.Network?.Name != null) {
                label += ' (' + navigationLinkSet.Network.Name + ')';
            }
            
            picklistValues.addRow(new VisualEditor.DataRow(
                label,
                navigationLinkSet.DeveloperName
            ));
        }
        
        return picklistValues;
    }
}