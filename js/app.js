(function(){

    var MyApp =  {};
    window.MyApp = MyApp;

    var template = function(name) {
        return Mustache.compile($('#'+name+'-template').html());
    };

    MyApp.Item = Backbone.Model.extend({

    });

    MyApp.Items = Backbone.Collection.extend({
        model : MyApp.Item,
        localStorage : new Store('items'),
    });

    MyApp.ItemsView = Backbone.View.extend({
        template : template('items'),

        initialize : function(){
                this.items = new MyApp.Items();
                this.items.fetch();
            },

            render : function(){
                this.$el.append(this.template);
                this.items.each(this.renderItem,this);
                return this;
            },

            renderItem : function(item){
                this.$('#list').append('<li><h3>'+item.get('name')+'</h3><p>'+item.get('description')+'</p></li>');
            }
    });

    MyApp.NewItemView = Backbone.View.extend({
        template : template("new"),

        events : {
            "click #submit" : "storeItem",
        },


        render : function(){
            this.$el.append(this.template);
            return this;
        },

        storeItem : function(event){
            event.preventDefault();
            this.collection = new MyApp.Items();
            this.collection.create({name : $("#name").val() , description : $("#description").val()});
        }

    });

    MyApp.Router = Backbone.Router.extend({
        initialize : function(options){
                this.el = options.el;
        },
        routes : {
            "" : "home",
            "home" : "home",
            "new" : "new",
            "about" : "about",
            
        },

        home : function(){
            console.log('in home() ...');
            var itemsView = new MyApp.ItemsView();
            this.el.empty();
            this.el.append(itemsView.render().el);
        },

        new : function(){
            console.log('in new()...');
            this.el.empty();
            this.el.append(new MyApp.NewItemView().render().el);
        },

        about : function(){
            console.log('in about()...');
            this.el.empty();
        },
        
       
        
    });

    var router = new MyApp.Router({el : $('#main')});
    Backbone.history.start();

})(jQuery);