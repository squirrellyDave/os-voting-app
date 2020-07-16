window.app = function () {
	// functions here
	_init = function () {        
        new Vue ({
            el: '#app',
            data: {                
                options: [
                    { id: 'a', title: 'Cats' },
                    { id: 'b', title: 'Dogs' }                    
                ],
                hostname: 'Workstation',
                vote: ''
            },
            computed: {
                getTitle: function() {
                    return this.options[0].title + ' vs. ' + this.options[1].title + "!";
                }
            },
            methods: {
                handleSubmit: function(form) {                    
                    this.vote = form.submitter.attributes.value.textContent;
                    console.log('Submitted: ' + this.vote);
                },
                setVote: function(id) {
                    var entry = this.options.find(option => option.id === id);
                    if (entry) {
                        this.vote = entry.id;
                        console.log('Submitted: ' + entry.title + ' (' + entry.id + ').');
                    }
                    else console.log('Error: Index "' + entry.id + '" of the vote was not found in the database.');
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