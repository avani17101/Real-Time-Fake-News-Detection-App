#Automatic extraction of text from a webpage link
import urllib.request
import urllib.error
import requests 
from urllib.parse import urlparse
from bs4 import BeautifulSoup
import csv
import pandas as pd
accepted_scheme = ['http://', 'https://', 'ftp']

def scraper(url):
    
    url=url
    def check(domain):
        """
        args: url string
        return:  True; if the URL is not present in the database
                the 1st element, which is the justification for the site being in the list; otherwise
        Used to check if the given 'domain' argument is present in the database
        """
        with open('api/sources.csv', 'r') as csv_data:
            fields = csv.reader(csv_data,delimiter="\t")
            # Reads the column titles in the field
            for row in fields:
                # Reads the value in each row, into a list for columns
                if domain == row[0]:
    #                 print(row[1])
                    pr = str(row[1])
                    if(row[2]):
                        pr += "   "+ row[2] 
                    if(row[3]):
                        pr += "   type  "+ row[3]
                    if(row[4]):
                        pr += "   problem: "+ row[4]
                    print(str(url)+" reported as "+ pr +'\n')
                    display_write(str(url)+" reported as "+ pr +'\n')
                    # Compares with the 0th element in the list 'row', which are the domain URLs
                    return row[1]
        return 1
                    
        


    # In[6]:


    def display_write(str):
        """
        args: string
        writes string to display.txt file which is to be dispalyed to user
        """
        str = "\n"+str+"\n"
        file = open("api/display.txt",'a')
        file.write(str)
        


    # In[7]:



    def getStrippedLink(link):
        """
        args: url string
        Used to generate a string with only the domain
        """
        parse = urlparse(link)
        # Parse the given link as a URL
        stripped_link = parse[1]
        # Get the domain specific string from the list 'parse'
        if 'www.' in link or 'http://' in link or 'https://' in link:
            # Check for the given strings in the link and remove them 
            stripped_link = stripped_link.replace('https://','').replace('http://','').replace('www.','')
        #print(stripped_link)
        return stripped_link


    def openURL(link):
        """
        agrs: url string
        Create a Request object for the given link, with a user-agent specified 
        """
        web_link = urllib.request.Request(link, data=None, headers={'User-Agent': 'Mozilla/5.0'})
        try:
            handle = urllib.request.urlopen(web_link)
            # Attempt to connect to the URL and store the HTML GET response in 'handle' variable
        except urllib.error.HTTPError:
            print("Page unavailable")
            return False
        return handle


    def fileTitleWrite(soup, link):
        """
        agrs: soup object, url string
        Write the domain and title to the 'title.txt' file
        """ 
        fo = open("api/title.txt", "w")
        fo.write(link + "\n")
        fo.write(soup.title.text)
        fo.close()


    def fileLinkWrite(soup, parse):
        '''
        args: soup object, parse string
        Write the hyperlinked URLs to the 'links.txt' file
        '''
        fo = open("api/links.txt", "w")
        for link in soup.findAll('a'):
            # Find all the 'a' tags
            if 0 <= str(link.get('href')).find(str(parse[1])):
                # Find the tags with 'href' and which do not match to given link's domain 
                continue
            else:
                for s in accepted_scheme:
                    if 0 <= str(link.get('href')).find(s):
                        # If accepted connection type, write the hyperlink to the file
                        fo.write(str(link.get('href')) + "\n")
        fo.close()
        
    def fileBodyWrite(soup, link):
        """
        agrs: soup object, url string
        Write the body to the 'small_body.txt"' file
        """
        fo = open("api/small_body.txt", "w")
        fo.write(link + "\n")
        fo.write(soup.body.text)
        fo.close()

    def writeBody(soup,link):
        """
        agrs: soup object, url string
        Write full article to the 'article.txt' file
        """
        r = requests.get(link) 

        soup = BeautifulSoup(r.content, 'html5lib')  
        #kill all script and style elements
        for script in soup(["script", "style"]):
            script.extract()    # rip it out
        text = soup.get_text()

        # break into lines and remove leading and trailing space on each
        lines = (line.strip() for line in text.splitlines())
        # break multi-headlines into a line each
        chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
        # drop blank lines
        text = '\n'.join(chunk for chunk in chunks if chunk)
        #print(text)
        f = open("api/article.txt", "w")
        f.write(text)
        f.close()
    def starter(link):
        """
        args: url string
        Runs the entire script
        """
        
        stripped_link = getStrippedLink(link)
    #     print(stripped_link)
        page = openURL(link)
        if page==False:
            return False
        res = page.read()
        #Parse the pase into res
        soup = BeautifulSoup(res, "html.parser")
        #Use BeautifulSoup to create a nested data structure out of the HTML file of the website
        fileTitleWrite(soup, stripped_link)
        fileLinkWrite(soup, urlparse(link))
        writeBody(soup,link)
        fileBodyWrite(soup, link)
        return True


    # In[8]:



    def checkDomain():
        """
        Check the URL of the given website, by invoking the check function 
        """ 
        fo = open('api/title.txt')
        link = fo.readline().rstrip("\n")
        fo.close()
        # Reading from the 'title.txt' file for the link of the site
        ret = check(link)
        # Store the return value of the check function
        if ret==1:
            return True
        else:
            reasons = check(link)
            return False


    def checkLinks():
        """
        Check the domain of all the hyperlinks in the given URL
        """
        fo = open('api/links.txt')
        for line in fo:
            link = getStrippedLink(line)
            if check(link):
                return False
        return True


    def result(link):
        """ 
        args: url string
        Main function for invoking all the respective scripts
        """
        link = str(link)
        Exist=starter(link)
        if(Exist==False):
            return "Page Unavailable"
        results = ""
        if checkDomain():
            r = checkLinks()
            # print(r)
            if r:
                results = "Fake-Link"
                # If the response is True, that means one or more of the hyperlinked URLs are present in the database
            else:
                results = "True"
                # If the response is False, no hyperlinked URLs are present in the database
        else:
            results ="Fake"
        display_write(str(results))
        print(results)
        return results


    # In[9]:


    return result(url) 
