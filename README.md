# [Pentridge Station](https://www.pentridgestation.com) Web App


A Rails monolith for the custom marketing and event booking website seen at [pentridgestation.com](https://www.pentridgestation.com). 

Features include a custom admin panel, content management using [Comfortable Mexican Sofa](), event booking, admin event approval and date block-off, email alerts using [SendGrid](https://sendgrid.com/), a community entertainer/food vendor showcase, honeypot spam deterrents, a one time popup for the home screen, a map of the location using [MapBox API](https://www.mapbox.com/), and a live calendar using Google Calendar. For a full walk through of the website and the development process, [view Julian's article here](). 



## Installation

Pentridge Station requires [Ruby](https://www.ruby-lang.org/en/) v2.7.2+ and [Node.js](https://nodejs.org/) v10+ to run, version 16 does not work. 

```s
brew install imagemagick
bundle install
yarn
rails db:migrate
rails s
```

## Set Credentials 
This repository uses [Figaro](https://github.com/laserlemon/figaro) to keep track of the API credentials. 
```s
bundle exec figaro install
```
The function above creates the file _application.yml_ and adds it to _.gitignore_. In _application.yml_ I keep track of: 
> cms_username: [SET_USERNAME]
> cms_password: [SET_PASSWORD]
> mapbox_public_api_key: [SET_API_KEY]

If you want to bring this project into production, you will need to create and configure an AWS bucket for the photos. Follow instructions in _storage.yml_ to set the AWS secrets.

You also will need to set up and configure SendGrid mailer in _production.rb_.

The clearest instructions I found on getting a Ruby on Rails web app are [these instructions on GoRails](https://gorails.com/deploy/ubuntu/20.04#vps)


## Add Layouts for CMS
A content management system allows the client to change the copy and photos of the website on their own. To set it up, log into the admin panel at the route '/admin,' create a new site, and then add a layout for each page with the information below:

#### Layout Name: home
> {{ cms:text headerTitle, namespace: header}}
{{ cms:text headerSubtitle, namespace: header}}
{{ cms:file headerPhoto, namespace: header}}
{{ cms:text gridOneShortTitle, namespace: grid}}
{{ cms:text gridOneLongTitle, namespace: grid}}
{{ cms:wysiwyg gridOneDescription, namespace: grid}}
{{ cms:file gridTwoPhoto, namespace: grid}}
{{ cms:text gridThreeShortTitle, namespace: grid}}
{{ cms:text gridThreeLongTitle, namespace: grid}}
{{ cms:text gridThreeActionText, namespace: grid}}
{{ cms:file gridThreePhoto, namespace: grid}}
{{ cms:text gridFourShortTitle, namespace: grid}}
{{ cms:text gridFourLongTitle, namespace: grid}}
{{ cms:text gridFourActionText, namespace: grid}}
{{ cms:file gridFourPhoto, namespace: grid}}
{{ cms:text quote, namespace: quote}}
{{ cms:text quoteAuthor, namespace: quote}}
{{ cms:file quotePhoto, namespace: quote}}
{{ cms:text busShortTitle, namespace: bus}}
{{ cms:text busLongTitle, namespace: bus}}
{{ cms:file busPhoto, namespace: bus}}
{{ cms:text articleOnePublisher, namespace: press}}
{{ cms:text articleOneHeadline, namespace: press}}
{{ cms:file articleOnePhoto, namespace: press}}
{{ cms:text articleOneLink, namespace: press}}
{{ cms:text articleTwoPublisher, namespace: press}}
{{ cms:text articleTwoHeadline, namespace: press}}
{{ cms:file articleTwoPhoto, namespace: press}}
{{ cms:text articleTwoLink, namespace: press}}
{{ cms:text articleThreePublisher, namespace: press}}
{{ cms:text articleThreeHeadline, namespace: press}}
{{ cms:file articleThreePhoto, namespace: press}}
{{ cms:text articleThreeLink, namespace: press}}
{{ cms:text articleFourPublisher, namespace: press}}
{{ cms:text articleFourHeadline, namespace: press}}
{{ cms:file articleFourPhoto, namespace: press}}
{{ cms:text articleFourLink, namespace: press}}
{{ cms:text articleFivePublisher, namespace: press}}
{{ cms:text articleFiveHeadline, namespace: press}}
{{ cms:file articleFivePhoto, namespace: press}}
{{ cms:text articleFiveLink, namespace: press}}
{{ cms:text notice, namespace: notice}}

#### Layout Name: about
> {{ cms:file headerPhoto, namespace: top}}
{{ cms:text title, namespace: top}}
{{ cms:wysiwyg blurb, namespace: top}}
{{ cms:file photo, namespace: photo}}
{{ cms:text firstDate, namespace: timeline}}
{{ cms:text firstEvent, namespace: timeline}}
{{ cms:wysiwyg firstDescription, namespace: timeline}}
{{ cms:text secondDate, namespace: timeline}}
{{ cms:text secondEvent, namespace: timeline}}
{{ cms:wysiwyg secondDescription, namespace: timeline}}
{{ cms:text thirdDate, namespace: timeline}}
{{ cms:text thirdEvent, namespace: timeline}}
{{ cms:wysiwyg thirdDescription, namespace: timeline}}
{{ cms:text fourthDate, namespace: timeline}}
{{ cms:text fourthEvent, namespace: timeline}}
{{ cms:wysiwyg fourthDescription, namespace: timeline}}
{{ cms:text fifthDate, namespace: timeline}}
{{ cms:text fifthEvent, namespace: timeline}}
{{ cms:wysiwyg fifthDescription, namespace: timeline}}
{{ cms:text callToBook, namespace: calltoaction}}

### Layout Name: partners
>{{ cms:wysiwyg about}}
{{ cms:file entertainersPhoto}}
{{ cms:file vendorsPhoto}}

### Layout Name: book
>{{ cms:file headerPhoto, namespace: top}}
{{ cms:wysiwyg aboutBlurb, namespace: top}}
{{ cms:wysiwyg cleaningProtocol, namespace: rules}}
{{ cms:wysiwyg parking, namespace: rules}}
{{ cms:wysiwyg hostRules, namespace: rules}}
{{ cms:wysiwyg locationBlurb, namespace: location}}
{{ cms:file testimonialOnePhoto, namespace: reviews}}
{{ cms:text testimonialOneName, namespace: reviews}}
{{ cms:text testimonialOneDescription, namespace: reviews}}
{{ cms:text testimonialOneQuote, namespace: reviews}}
{{ cms:file testimonialTwoPhoto, namespace: reviews}}
{{ cms:text testimonialTwoName, namespace: reviews}}
{{ cms:text testimonialTwoDescription, namespace: reviews}}
{{ cms:text testimonialTwoQuote, namespace: reviews}}
{{ cms:file testimonialThreePhoto, namespace: reviews}}
{{ cms:text testimonialThreeName, namespace: reviews}}
{{ cms:text testimonialThreeDescription, namespace: reviews}}
{{ cms:text testimonialThreeQuote, namespace: reviews}}
{{ cms:file testimonialFourPhoto, namespace: reviews}}
{{ cms:text testimonialFourName, namespace: reviews}}
{{ cms:text testimonialFourDescription, namespace: reviews}}
{{ cms:text testimonialFourQuote, namespace: reviews}}
{{ cms:number basePrice, namespace: basePricing }}
{{ cms:number weekendPrice, namespace: basePricing }}
{{ cms:number businessHourPrice, namespace: basePricing }}
{{ cms:number weddingPrice, namespace: basePricing }}
{{ cms:number largePartyPrice, namespace: basePricing }}
{{ cms:number bartenderHourly, namespace: bar  }}
{{ cms:number bartenderHours, namespace: bar }}
{{ cms:number openBarPricePerPerson, namespace: bar }}
{{ cms:number doorpersonHourly, namespace: doorperson }}
{{ cms:number doorpersonHours, namespace: doorperson }}
{{ cms:number entertainerHourly, namespace: entertainer }}
{{ cms:number entertainerHours, namespace: entertainer }}

For questions and help reach out to Julian on Twitter [@jdegrootlutzner](https://twitter.com/jdegrootlutzner)
The project is released under the MIT license. 

