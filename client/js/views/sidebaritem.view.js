App.SidebarItemView = Ember.View.extend({
	tagName: 'li',
	templateName: 'sidebaritem',
	classNameBindings: ['liClass'],

	liClass: function() {
		var classes = ['clear'],
			tab = this.get('context');

		if (tab.selected) {
			classes.push('selected');
		}

		if (tab.type !== 'network') {
			classes.push('child');
		}

		return classes.join(' ');
	}.property('context.selected').cacheable(),
	
	getClass: function() {
		var classNames = [''],
			tab = this.get('context'),
			network = App.__container__.lookup('controller:sidebar').get('networks').findBy('_id', tab.network);
		// ember people will hate me for using this but afaik it's impossible
		// to get the network

		if (tab.get('type') === 'network' && network.get('internal').status === 'connecting') {
			classNames.push('net-loader');
		} else if (tab.get('type') === 'network' && network.get('internal').status !== 'connecting') {
			classNames.push('net-loaded');
		} else if (tab.get('type') === 'channel' || tab.get('type') === 'query') {
			
		} else {
			classNames.push('net-loaded');
		}

		return classNames.join(' ');
	}.property('context').cacheable(),

	url: function() {
		var split = this.get('context.url').split('/');

		return (split.length == 1) ? '/t/' + split[0] : '/t/' + split[0] + '/' + encodeURIComponent(split[1]);
	}.property('context.url').cacheable(),

	title: function() {
		var active = this.get('context.active'),
			title = this.get('context.title');

		return (!active) ? '(' + title + ')' : title;
	}.property('context.title', 'context.active').cacheable(),
});