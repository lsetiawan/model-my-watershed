"use strict";

var WaterBalanceModel = {
    landMap: {
        '21': ['turfGrass', 'tallGrass'],
        '22': ['lir'],
        '23': ['hir'],
        '24': ['commercial'],
        '31': ['desert'],
        '41': ['forest'],
        '52': ['chaparral'],
        '71': ['grassland'],
        '81': ['pasture', 'shortGrass'],
        '82': ['rowCrops']
    },

    soilMap: [
        'sand',
        'loam',
        'sandyClay',
        'clayLoam'
    ],

    populateModel: function(data) {
        var model = {};
        var lines = data.split(/\n/);

        function processLine(soil, lands, precip) {
            if (!model[soil]) {
                model[soil] = {};
            }
            lands.forEach(function(land) {
                if (!model[soil][land]) {
                    model[soil][land] = {};
                }
                model[soil][land][precip] = {
                    'et': line[3],
                    'i' : line[4],
                    'r' : line[5]
                };
            });
        }

        for (var j = 1; j < lines.length; j++) {
            var line = lines[j].split(',');
            var soil = this.soilMap[line[2]];
            var lands = this.landMap[line[1]];
            var precip = line[0];

            if (soil && lands && precip) {
                processLine(soil, lands, precip);
            }
        }

        return model;
    }
};

module.exports = {
    WaterBalanceModel: WaterBalanceModel
};
