# Varsity
Live blog for varsity

## How to set up

1. Set the blog name in blogdata.php and index.php - this should match a key in the Blog table in the database
2. Set up the config file in inc
3. Set up https://github.com/FelixOnline/LiveBlog - point the URL to the blogdata.php file
4. Point to the LiveBlog app in js/config.js (see the sample file)

You can put matches in the sidebar by modifying the varsity table - sadly previous year's results must be removed while previous blogs can be retained

## Static mode
So you don't need to run the LiveBlog app all the time once Varsity is over, you can take the JSON output from blogdata.php and put it in the config.js file, as well as turning on static mode.

Static mode can also include match data!
