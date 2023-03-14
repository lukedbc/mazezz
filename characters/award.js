function Award({
    name,
    type,
    object
}) {
    this.id = generateId();
    this.name = name;
    this.type = type;
    this.object = object;
    this.isUsed = false;
}

function AwardInfo({
    name,
    type,
    object
}) {
    this.name = name;
    this.type = type;
    this.object = object;
}

Award.prototype.setObject = function(obj) {
    this.object = obj;
}

function buildAward(awardInfos) {
    if (!awardInfos) {
        return [];
    }
    let res = [];
    for (let awardInfo of awardInfos) {
        let award = new Award({
            name: awardInfo.name,
            type: awardInfo.type,
            object: { point: randomNumber(awardInfo.object.min, awardInfo.object.max) }
        });
        res.push(award);
    }
    return res;
}
