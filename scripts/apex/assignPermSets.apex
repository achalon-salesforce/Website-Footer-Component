// List of External IDs for the users you want to update
Set<String> externalIds = new Set<String>{
    'EXT001',
    'EXT002',
    'EXT003'
    // Add more external IDs as needed
};

// List of Permission Set API Names to assign
List<String> permissionSetNames = new List<String>{
    'Your_Permission_Set_1',
    'Your_Permission_Set_2',
    'Your_Permission_Set_3'
    // Add more permission set names as needed
};

// Query users and permission sets
List<User> users = [SELECT Id FROM User WHERE External_ID__c IN :externalIds];
List<PermissionSet> permSets = [SELECT Id FROM PermissionSet WHERE Name IN :permissionSetNames];

// Create list for permission set assignments
List<PermissionSetAssignment> psaToInsert = new List<PermissionSetAssignment>();

// Create assignments for each user and permission set combination
for (User u : users) {
    for (PermissionSet ps : permSets) {
        psaToInsert.add(new PermissionSetAssignment(
            AssigneeId = u.Id,
            PermissionSetId = ps.Id
        ));
    }
}

// Insert the assignments with error handling
if (!psaToInsert.isEmpty()) {
    try {
        insert psaToInsert;
        System.debug('Successfully assigned ' + psaToInsert.size() + ' permission sets');
    } catch (Exception e) {
        System.debug('Error assigning permission sets: ' + e.getMessage());
    }
} 