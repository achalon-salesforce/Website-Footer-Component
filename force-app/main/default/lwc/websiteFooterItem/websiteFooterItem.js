import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';

export default class WebsiteFooterItem extends NavigationMixin(LightningElement) {
    @api item = {};
    @api textStyle;
    href = '#';
    pageReference;

    get linkStyle() {
        return `${this.textStyle};`;
    }

    connectedCallback() {
        const { type, target, defaultListViewId } = this.item;

        // Set pageReference based on link type
        switch(type) {
            case 'SalesforceObject':
                this.pageReference = {
                    type: 'standard__objectPage',
                    attributes: {
                        objectApiName: target
                    },
                    state: {
                        filterName: defaultListViewId
                    }
                };
                break;
            case 'InternalLink':
                this.pageReference = {
                    type: 'standard__webPage',
                    attributes: {
                        url: basePath + target
                    }
                };
                break;
            case 'ExternalLink':
                this.pageReference = {
                    type: 'standard__webPage',
                    attributes: {
                        url: target
                    }
                };
                break;
        }

        // Generate navigation URL
        if (this.pageReference) {
            this[NavigationMixin.GenerateUrl](this.pageReference)
                .then(url => {
                    this.href = url;
                });
        }
    }

    handleClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (this.pageReference) {
            this[NavigationMixin.Navigate](this.pageReference);
        } else {
            console.error('Navigation not implemented for item:', this.item);
        }
    }
} 