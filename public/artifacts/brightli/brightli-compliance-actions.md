# Brightli Compliance & Actions Taken

### **CCPA**

The California Consumer Privacy Act or CCPA gives consumers the following rights relating to their personal information:

- The right to know what personal information is collected and how it is used and shared
- The right to delete personal information collected
- The right to opt-out of the sale of personal information
- The right to non-discrimination for exercising rights under the CCPA
- The right to correct inaccurate personal information
- The right to limit the use and disclosure of sensitive personal information

*This information was found at http://oag.ca.gov/privacy/ccpa*

Brightli adheres to the CCPA in the following ways:

- The privacy policy covers what personal information is collected and what it is used for
- The app offers several data deletion options including a mass delete option for all data entered and generated
- The Brightli app does not sell user data and this is explicitly stated in the privacy policy
- Users have free will to use the app and all of its features as they see fit. As stated, there are no Brightli servers between the user's device(s) and their data so there is no option for discrimination
- Brightli does not store user information on servers. Users can make corrections within the app, which only stores data on their device or in their iCloud

### **GDPR**

The General Data Protection Regulation, better known as GDPR, guides the data collection and data handling practices for residents in the European Union.

Given the vast requirements and the attention warranted to comply with this regulation, as well as the penalties that may be incurred for violations, I opted to avoid this compliance risk by restricting the app to the US, Canada, Latin America and the Caribbean region for now.

### **PCI DSS**

PCI DSS is used to enforce data security measures when handling and storing sensitive payment information, such as payment account information and payment card data. It offers the necessary guidance to implement consistent security protections for Cardholder Data and the Card Data Environment for the organizations that process, store or transmit card data.

Early in the design phase, I knew that this was a compliance risk that would need to be transferred. Being the sole team member of Brightli, I understood that designing my own payment system would require several controls that are time consuming and require a great deal of attention. I thought it best to find a reputable third-party solution to handle payment activity and management. Revenuecat was selected firstly because it is PCI DSS Level 1 certified which is the highest level of certification of its kind. Tacked on positives that helped the selection was its simple setup, cost structure, and how seamlessly it integrates within the iOS and Android (for future growth) environments.
