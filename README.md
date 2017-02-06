Amend
==========


Amend is a Platform–as-a-Service (PaaS) solution hosted on cloud. Amend helps you manage your application’s image resources in the cloud without having to worry about scale and performance. The resources are delivered by high-performance servers through Content Delivery Network (CDN).

Resources are uploaded, managed, and transformed using amend’s easy to use APIs and SDKs. Infrastructure used for these operations is infinitely scalable for handling high load and bursts of traffic.

Amend provides URL based APIs and SDKS that can be easily integrated with any Web or Mobile development framework. 

For projects based on Javascript, amend provides a library for simplifying the integration even further.

## Getting started guide
[Getting started guide for Javascript]

## Setup ######################################################################

amend Javascript library is available as Github project at https://github.com/amendcloud/amend_javascript

### Manual setup

1. Download github sample project
2. Go to lib-amend folder and copy all file in your solution.
3. Include the javascript file in your HTML. For Example:

	```html
	<script src="Scripts/jquery.min.js"></script>
    <script src="lib-amend/jquery.cloudamend.js"></script>
	```
	
## Try it right away

Sign up for a [free account](http://developer.amendcloud.com/Register) so you can try out image transformations and seamless image delivery through CDN.

*Note: Replace `test` in all the following examples with your amend's `amend name`.*  

Accessing an uploaded image with the `baby` public ID through a CDN:

    http://amend.cloud/test/image/baby

![Sample](http://amend.cloud/test/image/w_300/baby "baby")

Generating a 150x100 version of the `baby` image and downloading it through a CDN:

    http://amend.cloud/test/image/w_150,h_100,fit_fill/baby

![Sample 150x100](http://amend.cloud/test/image/w_150,h_100,fit_fill/baby "baby 150x100")

Converting to a 150x100 PNG with rounded corners of 25 pixels: 

    http://amend.cloud/test/image/w_150,h_100,fit_fill/r_25/baby

![Sample 150x150 Rounded PNG](http://amend.cloud/test/image/w_150,h_100,fit_fill/r_25/baby "baby 150x150 Rounded PNG")

For plenty more transformation options, see our [image transformations documentation](http://amendcloud.com/docs/image_transformation).
 
## Usage

### Configuration

Each request for building a URL of a remote cloud resource must have the `amend_name` parameter set. 
Each request to our secure APIs (e.g., image uploads) must have the `access_key` and `access_secret` parameters set. 


Setting the `amend_name`, `access_key` and `access_secret` parameters can be done either directly in each call to a amend  method, 
by when initializing the amend object.

The main entry point of the library is the Amend object.

	Amend.setAmendName("my_amend_name");
	Amend.setCredentials("my_access_key", "my_access_secret");


### Upload

Assuming you have your amend configuration parameters defined (`amend_name`, `access_key`, `access_secret`), uploading to amend is very simple.
    
The following example uploads a local JPG to the cloud: 
 
	Amend.upload('fileUpload', function (resp) {
		string url = resp.CDNUrl;
		string imageName = resp.ImageName;
	});
	
	    
The uploaded image is assigned a randomly generated public Name. The image is immediately available for download through a CDN:

    string url = resp.CDNUrl;
        
    http://amend.cloud/cloud_name/image/cloud_name112128
	
you can get Image Name return by amend upload api

	string imageName = resp.ImageName;
	
### Embedding and transforming images

Any image uploaded to amend can be transformed and embedded using powerful view helper methods:

The following example generates the url for accessing an uploaded `baby` image while transforming it to fill a 100x150 rectangle and set on Image Id img

	var amendOptions = {"width":100, "height":150, "scale":Amend.FIT_FILL);
	Amend.load('baby', amendOptions).into("#img")

Another example, emedding a smaller version of an uploaded image while generating a 90x90 face detection based thumbnail: 

	var amendOptions = {"width":90, "height":90, "scale":Amend.FIT_FACE);
	Amend.load('women', amendOptions).into("#img")
	  
  
## Additional resources

Additional resources are available at:

* [Website](http://amendcloud.com)
* [Documentation](http://amendcloud.com/docs)

## Support

Contact us at [support@amend.cloud](mailto:support@amend.cloud)

Or via Twitter: [@amend](https://twitter.com/#!/amendcloud)