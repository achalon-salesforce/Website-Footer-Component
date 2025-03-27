/*
*********************************************************
LWC Name       : websiteFooter
Created Date    : 3/21/2025
@description    : This component displays a customizable website footer with navigation menus, social links, and contact information.
@version        : 1.0
@author         : Andrew Chalon
Modification Log:
- Ver 1.0 [3/21/2025] [Andrew Chalon] Initial Version
*********************************************************
*/
import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { CurrentPageReference } from 'lightning/navigation';
import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';

export default class WebsiteFooter extends NavigationMixin(LightningElement) {

    @api maxWidth;
    @api backgroundColor;
    @api bottomBarColor;
    @api addressLine1;
    @api addressLine2;
    @api city;
    @api state;
    @api zipCode;
    @api phone;
    @api copyrightText;
    @api textColor;
    @api footerMenuItems;
    @api copyrightMenuItems;
    @api overrideBackgroundColor;
    @api overrideBottomBarColor;
    @api overrideTextColor;
    @api instagramUrl;
    @api twitterUrl;
    @api facebookUrl;
    @api linkedinUrl;

    publishedState;
    footerItems = [];
    copyrightItems = [];
    isLoaded = false;
    error;

    get containerStyle() {
        const bgColor = this.overrideBackgroundColor && this.backgroundColor ? 
            this.backgroundColor : 'var(--lwc-brandTextLink)';
        return `background-color: ${bgColor};`;
    }

    get contentStyle() {
        return `max-width: ${this.maxWidth};`;
    }

    get bottomBarStyle() {
        const bottomColor = this.overrideBottomBarColor && this.bottomBarColor ? 
            this.bottomBarColor : 'var(--lwc-brandAccessible)';
        return `background-color: ${bottomColor};`;
    }

    get textStyle() {
        const color = this.overrideTextColor && this.textColor ? 
            this.textColor : 'var(--lwc-colorTextBrandPrimary)';
        return `color: ${color};`;
    }

    get svgStyle() {
        const color = this.overrideTextColor && this.textColor ? 
            this.textColor : 'var(--lwc-colorTextBrandPrimary)';
        return `fill: ${color};`;
    }

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        const app = currentPageReference?.state?.app;
        this.publishedState = app === 'commeditor' ? 'Draft' : 'Live';
    }

    @wire(getNavigationMenuItems, {
        menuName: '$footerMenuItems',
        publishedState: '$publishedState'
    })
    wiredFooterMenuItems({ error, data }) {
        if (data) {
            this.footerItems = this.processMenuItems(data, false);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.footerItems = [];
            console.error('Footer menu error:', error);
        }
    }

    @wire(getNavigationMenuItems, {
        menuName: '$copyrightMenuItems',
        publishedState: '$publishedState'
    })
    wiredCopyrightMenuItems({ error, data }) {
        if (data) {
            this.copyrightItems = this.processMenuItems(data, true);
            this.error = undefined;
            this.isLoaded = true;
        } else if (error) {
            this.error = error;
            this.copyrightItems = [];
            console.error('Copyright menu error:', error);
        }
    }

    processMenuItems(data, isCopyright = false) {
        
        // For copyright items, use simple flat processing
        if (isCopyright) {
            const processed = data.map((item, index) => ({
                id: item.Id,
                label: item.Label,
                target: item.Target,
                defaultListViewId: item.DefaultListViewId,
                type: item.Type,
                accessRestriction: item.AccessRestriction,
                isLast: index === data.length - 1
            }));
            return processed;
        }

        // For footer items, use the column-based processing
        const itemsMap = new Map();
        data.forEach((item) => {
            itemsMap.set(item.Id, {
                id: item.Id,
                label: item.Label,
                target: item.Target,
                defaultListViewId: item.DefaultListViewId,
                type: item.Type,
                accessRestriction: item.AccessRestriction,
                parentId: item.ParentId,
                children: []
            });
        });

        const columns = [];
        
        // Process MenuLabel items - each in its own column
        data.forEach(item => {
            if (item.Type === 'MenuLabel') {
                const processedItem = itemsMap.get(item.Id);
                data.forEach(potentialChild => {
                    if (potentialChild.ParentId === item.Id) {
                        processedItem.children.push(itemsMap.get(potentialChild.Id));
                    }
                });
                columns.push([processedItem]); // Each MenuLabel gets its own column
            }
        });

        // Process standalone items into their own column
        const standaloneItems = data
            .filter(item => !item.ParentId && item.Type !== 'MenuLabel')
            .map(item => itemsMap.get(item.Id));

        if (standaloneItems.length > 0) {
            columns.push(standaloneItems);
        }
        return columns;
    }

    get parsedFooterMenuItems() {
        return this.footerItems;
    }

    get parsedCopyrightMenuItems() {
        return this.copyrightItems;
    }

    handleSocialClick(event) {
        const url = event.currentTarget.dataset.url;
        if (url) {
            this[NavigationMixin.Navigate]({
                type: 'standard__webPage',
                attributes: {
                    url: url
                }
            });
        }
    }
}