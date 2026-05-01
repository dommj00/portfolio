# Project Overview

### **What This Tool Does**

Python-based email security analyzer that integrates five different third-party APIs to provide phishing and domain reputation analysis. This tool automates a large part of the email analysis workflow by querying VirusTotal, AbuseIPDB, WhoisXML, Google Custom Search, and DNS servers simultaneously, then aggregating findings into a single analysis report.

### **Core Analysis Functions**

The analyzer handles four main security checks that cover different attack vectors:

- Header analysis extracting sender information and validating SPF/DMARC records
- Domain intelligence retrieving WHOIS data and ownership details
- Blocklist verification checking domains and IPs against reputation databases
- Authentication validation confirming SPF and DMARC configuration through DNS

### **Primary Use Cases**

I built this tool to address specific security operations scenarios in my daily work. Phishing investigation tickets would take 15-20 minutes to arrive at a conclusion due to the number of sources needed for analysis. The CLI tool was designed to aggregate all results by simply pasting email header information into command line and getting rapid results via api GET functions. 


### **What I Would Update**

Several features would extend the tool's capabilities:

- Email attachment analysis using VirusTotal file scanning
- URL scanning and reputation checking for embedded links
- Rate limiting controls for API quota management
- Web-based interface

The modular architecture makes these enhancements straightforward to implement. Each API integration operates independently, so adding new capabilities doesn't require refactoring existing functionality.
