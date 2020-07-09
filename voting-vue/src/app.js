window.app = function () {
	// functions here
	_init = function () {        
        new Vue ({
            el: '#app',
            data: {                
                option_a: 'Cats',
                option_b: 'Dogs',
                hostname: 'Workstation',
                vote: ''
            },
            computed: {
                getTitle: function() {
                    return this.option_a + ' vs. ' + this.option_b + "!";
                }
            },
            methods: {
                handleSubmit: function(form) {
                    if (form.submitter.attributes.value === undefined) return;
                    this.vote = form.submitter.attributes.value.textContent;
                    console.log('Submitted: ' + this.vote);
                },
                setVote: function(value) {
                    this.vote = value;
                    console.log('Submitted: ' + this.vote);
                },
                voted: function() {
                    return this.vote != '';
                }
            }
        });
    }

	// public interface
	return {
		init: _init
	}
}();

$(document).ready(function() {
    app.init();
});