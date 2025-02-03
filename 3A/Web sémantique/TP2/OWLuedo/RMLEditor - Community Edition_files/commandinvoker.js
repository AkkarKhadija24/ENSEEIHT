var CommandInvoker = (function(){
	var instance;

	function createInstance() {
		function execute(command) {
			command.execute();
		}
		function undo(command) {
			command.undo();
		}
		return {
			execute: execute,
			undo: undo
		};
	}

	return {
		getInvoker: function() {
			if(!instance) {
				instance = createInstance();
			}

			return instance;
		}
	};
})();