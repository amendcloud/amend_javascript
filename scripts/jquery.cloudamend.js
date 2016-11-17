var Amend = {
    FIT_XY: "fit_xy",
    FIT_INSIDE: "fit_inside",
    FIT_WIDTH: "fit_width",
    FIT_FILL: "fit_fill",
    FIT_HEIGHT: "fit_height",
    FIT_FACE: "fit_face",

    LEFT: "left",
    RIGHT: "right",
    TOP: "top",
    BOTTOM: "bottom",
    CENTER: "center",
    CENTER_TOP: "center_top",

    NORMAL: "normal",
    BOLD: "bold",
    ITALIC: "italic",

    X: "x",
    Y: "y",
    XY: "XY",

    MAX: "max",

    imgId: null,
    imgUrl: null,
    options: "",
    AMEND_NAME: null,
    ACCESS_KEY: null,
    ACCESS_SECRET: null,
    load: function (ImageId, options) {
        this.options = "";
        this.imgId = ImageId;
        if (options != null) {
            for (var prop in options) {
                if (this.options != '') { this.options += "/" };
                switch (prop) {
                    case 'transform':
                        this.options += getTransform(options[prop]);
                        break;
                    case 'quality':
                        this.options += 'quality_' + options[prop];
                        break;
                    case 'radius':
                        this.options += 'r_' + options[prop];
                        break;
                    case 'grayscale':
                        this.options += 'grayscale';
                        break;
                    case 'invert':
                        this.options += 'invert';
                        break;
                    case 'effect':
                        this.options += getEffects(options[prop]);
                        break;
                    case 'flip':
                        this.options += 'flip_' + options[prop];
                        break;
                    case 'rotate':
                        this.options += 'rotate_' + options[prop];
                        break;
                    case 'overlay':
                        this.options += getOverlay(options[prop]);
                        break;
                }
            }
        }
        return this;
    },
    fetch: function (ImageUrl, options) {
        this.options = "";
        this.imgUrl = ImageUrl;
        if (options != null) {
            for (var prop in options) {
                if (this.options != '') { this.options += "/" };
                switch (prop) {
                    case 'transform':
                        this.options += getTransform(options[prop]);
                        break;
                    case 'quality':
                        this.options += 'quality_' + options[prop];
                        break;
                    case 'radius':
                        this.options += 'r_' + options[prop];
                        break;
                    case 'grayscale':
                        this.options += 'grayscale';
                        break;
                    case 'invert':
                        this.options += 'invert';
                        break;
                    case 'effect':
                        this.options += getEffects(options[prop]);
                        break;
                    case 'flip':
                        this.options += 'flip_' + options[prop];
                        break;
                    case 'rotate':
                        this.options += 'rotate_' + options[prop];
                        break;
                    case 'overlay':
                        this.options += getOverlay(options[prop]);
                        break;
                }
            }
        }
        return this;
    },

    into: function (imgName) {
		if(Amend.AMEND_NAME==null){
			console.error("amend name required")
			return;
		}
        if (Amend.imgId != null && Amend.imgId != '') {
            var url = "http://amend.cloud/" + Amend.AMEND_NAME + "/image";
            if (this.options != "") {
                url += "/" + this.options;
            }
            url += "/" + this.imgId;
            //url += this.imgId;
            $(imgName).attr('src', url);
        } else {
            var url = "http://amend.cloud/" + Amend.AMEND_NAME + "/fetch/"
            if (this.options != "") {
                url += "/" + this.options;
            }
            url += "/" + this.imgUrl;
            $(imgName).attr('src', url);
        }
    },

    upload: function (id, callback) {
		if(Amend.AMEND_NAME==null){
			console.error("Amend name required");
			callback({"StatusCode":400,"Message":"Amend name required"});
			return;
		}
		if(Amend.ACCESS_KEY==null){
			console.error("Amend credentials required")
			callback({"StatusCode":400,"Message":"Amend credentials required"});
			return;
		}
        var file = document.getElementById(id).files[0];
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            var name = $("#tbName").val();
            var img = reader.result;
            img = img.split(',')[1];
            var data = new Object();
            data.ImageBase64 = img;
            if (name != "") {
                data.ImageId = name;
            }

            $.ajax({
                "url": "http://amend.cloud/" + Amend.AMEND_NAME + "/upload/",
                "type": "POST",
                "data": (data),
                "beforeSend": function (request) {
                    request.setRequestHeader("AccessKey", Amend.ACCESS_KEY);
                    request.setRequestHeader("AccessSecret", Amend.ACCESS_SECRET);
                },
                "content-type": "application/json",
                "complete": function (resp) {
                    callback(JSON.parse(resp.responseText));
                }
            });

        }, false);

        if (file) {
            reader.readAsDataURL(file);
        } else {
            callback({ "StatusCode": 404, "Message": "No file found" });
        }
    },
    setCredentials: function (access_key, access_secret) {
        Amend.ACCESS_KEY = access_key;
        Amend.ACCESS_SECRET = access_secret;
    },
    setAmendName: function (amend_name) {
        Amend.AMEND_NAME = amend_name;
    }
}

function getEffects(effect) {
    var options = '';
    for (var prop in effect) {
        if (options != '') { options += ',' };
        switch (prop) {
            case 'brightness':
                options += 'bright_' + effect[prop];
                break;
            case 'contrast':
                options += 'contrast_' + effect[prop];
                break;

        }
    }
    return options;
}

function getOverlay(overlay) {
    var options = '';
    for (var prop in overlay) {
        if (options != '') { options += ',' };
        switch (prop) {
            case 'image':
                options += 'oi-' + overlay[prop];
                break;
            case 'text':
                options += 'ot-' + overlay[prop];
                break;
            case 'size':
                options += 'size_' + overlay[prop];
                break;
            case 'style':
                options += 'style_' + overlay[prop];
                break;
            case 'color':
                options += 'c_' + overlay[prop];
                break;
            case 'x':
                options += 'x_' + overlay[prop];
                break;
            case 'y':
                options += 'y_' + overlay[prop];
                break;
        }
    }
    return options;
}

function getTransform(transform) {
    var options = '';
    for (var prop in transform) {
        if (options != '') { options += ',' };
        switch (prop) {
            case 'width':
                options += 'w_' + transform[prop];
                break;
            case 'height':
                options += 'h_' + transform[prop];
                break;
            case 'scale':
                options += transform[prop];
                break;
            case 'align':
                options += 'align_' + transform[prop];
                break;
            case 'x':
                options += 'x_' + transform[prop];
                break;
            case 'y':
                options += 'y_' + transform[prop];
                break;
            case 'color':
                options += 'c_' + transform[prop];
                break;
        }
    }
    return options;
}



