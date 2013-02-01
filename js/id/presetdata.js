iD.presetData = function() {
    var presets = {},
        data = [];

    presets.data = function(_) {
        if (!arguments.length) return data;
        data = _;
        return presets;
    };

    presets.favs = function() {
        return data.filter(function(d) {
            return d.favorite;
        });
    };

    presets.match = function(entity) {
        return data.filter(function(d) {
            return _.contains(d.type, entity.type);
        });
    };

    presets.matchTags = function(entity) {
        var tags, count, maxcount = 0, best;
        for (var i = 0; i < data.length; i++) {
            count = 0;
            tags = data[i].tags;
            if (!_.contains(data[i].type, entity.type)) continue;
            for (var k = 0; k < tags.length; k++) {
                if (entity.tags[tags[k].key] == tags[k].value) count++;
            }
            if (count > maxcount) best = data[i], maxcount = count;
        }
        return best;
    };

    return presets;
};