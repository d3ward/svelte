/*jshint newcap: false */

/**
* @fileOverview bScript - the lightweight JavaScript framework 
* @author Matt Begent
* @version 1.0.0
*/

(function (window, document) {

'use strict'; 

var bScript = {

    /**
    * The dom ready function
    * @memberOf bScript
    * @param {function} callback Run functions when the dom is loaded
    * @returns bScript
    * @example
    * $(document).ready(function() { });
    */
    ready: function(callback){
        document.addEventListener('DOMContentLoaded', callback);
    },

    /**
    * Each loop
    * @memberOf bScript
    * @param {function} callback Function to be run on each selector
    * @returns bScript
    * @example
    * $('.each').each(function() { });
    */
    each: function(callback) {  
        [].forEach.call(this.selector, function(el) {
            callback(el);
        });
        return this; 
    },

    /**
    * Find a new selector within a parent selector
    * @memberOf bScript
    * @param {string} selector Find a new selector within a parent selector
    * @returns bScript
    * @example
    * $('.parent').find('.child');
    */
    find: function(selector) {
        this.selector = this.selector[0].querySelectorAll(selector);
        return this;
    },

    /**
    * Set the CSS for an element
    * @memberOf bScript
    * @param {string} property Property of element to set
    * @param {string} value Value of property to set
    * @returns bScript
    * @example
    * $('.color').css('color', 'red');
    */
    css: function(property, value) {  
        return this.each(function(el) {
            el.style[property] = value;
        });
    },

    /**
    * Sets selector to display none
    * @memberOf bScript
    * @returns bScript
    * @example
    * $('.hide').hide();
    */
    hide: function() {  
        return this.each(function(el) {
            el.style.display = 'none';
        });
    },

    /**
    * Sets selector to display block
    * @memberOf bScript
    * @returns bScript
    * @example
    * $('.show').show();
    */
    show: function() {  
        return this.each(function(el) {
            el.style.display = 'block';
        });
    },

    /**
    * Checks whether the selector is visible
    * @memberOf bScript
    * @returns Boolean
    * @example
    * $('.visible').visible();
    */
    visible: function() {
        return this.selector[0].offsetWidth > 0 || this.selector[0].offsetHeight > 0;
    },
    
    /**
    * Toggles the display property of the selector
    * @memberOf bScript
    * @returns Boolean
    * @example
    * $('.visible').visible();
    */
    toggle: function() {  
        return this.each(function(el) {
            if(el.style.display === '' || el.style.display === 'block') {
                el.style.display = 'none';
            }
            else {
                el.style.display = 'block';
            }
        });
    },

    /**
    * Adds a class to the selector
    * @memberOf bScript
    * @param {string} className Name of class to add
    * @returns bScript
    * @example
    * $('.class').addClass('another-class');
    */
    addClass: function(className) {  
        return this.each(function(el) {
            el.classList.add(className);
        }); 
    },

    /**
    * Removes a class from the selector
    * @memberOf bScript
    * @param {string} className Name of class to remove
    * @returns bScript
    * @example
    * $('.class remove-class').removeClass('remove-class');
    */
    removeClass: function(className) {  
        return this.each(function(el) {
            el.classList.remove(className);
        });
    },

    /**
    * Toggles a class from the selector
    * @memberOf bScript
    * @param {string} className Name of class to toggle
    * @returns bScript
    * @example
    * $('.class toggle-class').toggleClass('toggle-class');
    */
    toggleClass: function(className) {  
        return this.each(function(el) {
            el.classList.toggle(className);
        });
    },

    /**
    * Checks whether the selector has a specific class
    * @memberOf bScript
    * @returns Boolean
    * @example
    * $('.class').hasClass('another-class');
    */
    hasClass: function(className) { 
        //Only need to check first?
        return this.selector[0].classList.contains(className);
    },

    /**
    * Attaches an event to the selector
    * @memberOf bScript
    * @param {string} name Name of event e.g. click
    * @param {function} callback Callback to run when event is triggered
    * @returns bScript
    * @example
    * $('.click-me').on('click', function() { alert('Clicked!'); });
    */
    on: function(name, callback) {  
        return this.each(function(el) {
            el.addEventListener(name, callback);
        });
    },

    /**
    * Removes an event from the selector
    * @memberOf bScript
    * @param {string} name Name of event e.g. click
    * @param {function} callback Callback to run when event is triggered
    * @returns bScript
    * @example
    * $('.click-me').off('click', function() { alert('Clicked!'); });
    */
    off: function(name, callback) {  
        return this.each(function(el) {
            el.removeEventListener(name, callback);
        });
    },

    /**
    * Trigger an event from the selector
    * @memberOf bScript
    * @param {string} name Name of event e.g. click
    * @returns bScript
    * @example
    * $('.click-me').trigger('click');
    */
    trigger: function(name) {
        return this.each(function(el) {
            var triggerEvent = new Event(name);
            el.dispatchEvent(triggerEvent);
        });
    },

    /**
    * Ajax function
    * @memberOf bScript
    * @param {object} options Ajax options
    * @example 
        $.fn.ajax({
            url: "data/test.json",
            type: "GET",
            success: function(data) {
                $(".test-json").text(data);
            },
            error: function() {
                $(".test-json").text("An error has occurred");
            }
        });
    */
    ajax: function(options) {

        var httpRequest = new XMLHttpRequest();
        options.url = options.url || location.href;
        options.data = options.data || null;
        options.type = options.type || 'GET';
        options.success = options.success || function() {};
        options.error = options.error || function() {};

        httpRequest.open(options.type, options.url);
        httpRequest.send(options.data);

        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState === 4) {
                if (httpRequest.status === 200) {
                    options.success(httpRequest.responseText);
                } else {
                    options.error(httpRequest.statusText);
                }
            }
        };

    },

    /**
    * Find the previous sibling to the current selector
    * @memberOf bScript
    * @returns bScript
    * @example
    * $('.selector').prev();
    */
    prev: function() {  
        this.selector = this.selector[0].previousElementSibling;
        return this;
    },

    /**
    * Find the next sibling to the current selector
    * @memberOf bScript
    * @returns bScript
    * @example
    * $('.selector').next();
    */
    next: function() {  
        this.selector = this.selector[0].nextElementSibling;
        return this;
    },

    /**
    * Find the first element of the selector
    * @memberOf bScript
    * @returns bScript
    * @example
    * $('.selector').first();
    */
    first: function() {         
        this.selector = this.selector.slice(0,1);
        return this;
    },

    /**
    * Find the last element of the selector
    * @memberOf bScript
    * @returns bScript
    * @example
    * $('.selector').last();
    */
    last: function() {  
        var arrayLength = this.selector.length;
        this.selector = this.selector.slice(arrayLength-1,arrayLength);
        return this;
    },

    /**
    * Add HTML to the page in relation to the current selector
    * @memberOf bScript
    * @param {string} position The position to add the html - before, after, atstart, atend
    * @param {string} html The HTML to add
    * @returns bScript
    * @example
    * $('.html').append('before','<p>I am before</p>');
    */
    append: function(position, html) {  
        return this.each(function(el) {

            switch(position.toLowerCase()){
                case 'before': return el.insertAdjacentHTML('beforebegin',html);
                case 'after': return el.insertAdjacentHTML('afterend',html);
                case 'atstart': return el.insertAdjacentHTML('afterbegin',html);
                case 'atend': return el.insertAdjacentHTML('beforeend',html);
            }

        });
    },

    /**
    * Set the text of a selector
    * @memberOf bScript
    * @param {string} text Text to set
    * @returns bScript
    * @example
    * $('.text').text('Some text.');
    */
    text: function(text) {  
        return this.each(function(el) {
            el.textContent = text;
        });
    },

    /**
    * Set the HTML of a selector
    * @memberOf bScript
    * @param {string} html HTML to set
    * @returns bScript
    * @example
    * $('.text').html('<span>A span.</span>');
    */
    html: function(html) {  
        return this.each(function(el) {
            el.innerHTML = html;
        });
    },

    /**
    * Empty the HTML of a selector
    * @memberOf bScript
    * @returns bScript
    * @example
    * $('.empty-me').empty();
    */
    empty: function() {  
        return this.each(function(el) {
            el.innerHTML = '';
        });
    },

    /**
    * Clone a selector
    * @memberOf bScript
    * @returns bScript
    * @example
    * $('.empty-me').clone();
    */
    clone: function() {  
        return this.each(function(el) {
            el.clodeNode();
        });
    },

    /**
    * Removes a selector
    * @memberOf bScript
    * @returns bScript
    * @example
    * $('.remove-me').remove();
    */
    remove: function() { 
        return this.each(function(el) {
            el.parentNode.removeChild(el);
        });
    },

    /**
    * Set the attribute of a selector
    * @memberOf bScript
    * @param {string} name Attr to set
    * @param {string} value Value to set
    * @returns bScript
    * @example
    * $('.attr').setAttr('data-attr','Value');
    */
    setAttr: function(name, value) {  
        return this.each(function(el) {
            el.setAttribute(name, value);
        });
    },

    /**
    * Get the value of an attribute of a selector
    * @memberOf bScript
    * @param {string} name Attr to get
    * @returns Attribute value
    * @example
    * $('.attr').setAttr('data-attr');
    */
    getAttr: function(name) {  
        return this.selector[0].getAttribute(name);
    },

    /**
    * Remove an attribute from a selector
    * @memberOf bScript
    * @param {string} name Attr to remove
    * @returns bScript
    * @example
    * $('.attr').removeAttr('data-attr');
    */
    removeAttr: function(name) {  
        return this.each(function(el) {
            el.removeAttribute(name);
        });
    },

    /**
    * Get the value of a selector
    * @memberOf bScript
    * @returns value
    * @example
    * $('.input').val();
    */
    val: function() {
        return this.selector[0].value;
    },

    /**
    * Get the number of matched elements in the selector
    * @memberOf bScript
    * @returns length
    * @example
    * $('.length').length();
    */
    length: function() {  
        return this.selector.length;
    },

    /**
    * Get the height of the first element in the selector
    * @memberOf bScript
    * @returns height
    * @example
    * $('.height').height();
    */
    height: function() {  
        return this.selector[0].offsetHeight;
    },

    /**
    * Get the width of the first element in the selector
    * @memberOf bScript
    * @returns height
    * @example
    * $('.width').width();
    */
    width: function() {  
        return this.selector[0].offsetWidth;
    },

    /**
    * Returns true if the element matches the selector string
    * @memberOf bScript
    * @param {string} selector Selector to match
    * @returns boolean
    * @example
    * $('.paragraph').matches('p');
    */
    matches: function(selector) {  
        var el = this.selector[0];
        // Tidy up
        Element.prototype.matches =  Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector;
        return el.matches(selector);
    }
};

/** @constructor bScript */
function $(selector, context) {
    return Object.create(bScript, {        
        selector: {
            get: function () { 
                if(typeof selector  === 'string') {
                    var startAt = document.querySelector(context) || document;
                    return Array.prototype.slice.call(startAt.querySelectorAll(selector));            
                } else {
                    return [selector]; // could be an object, dom node or a function but always kept in an array
                }
            },
            set: function(value) {
                selector = value;
            }
        },
        name: {
            value: 'bScript'
        },
        version: {
            value: '1.0.0'
        }
    });
}

//Expose bScript to the world:-)
window.$ = $;

//Expose functions to the world:-)
window.$.fn = window.$.bScript = bScript;

}(window, document));   