'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({ '_id': { 'type': 'String' } });
mongoose.model('records', schema, 'records');

//This value sets the maximum time mongo can run the operation
const mongoQueryTimeOut = process.env.MONGO_QUERY_TIMEOUT_SEC ? Number(process.env.MONGO_QUERY_TIMEOUT_SEC) * 1000 : 5000;

const list = (_req, _res) => {
    let ip = _req.body;
    let _output = { code: 0, msg: 'success' };
    let page = _req['query']['page'] ? parseInt(_req['query']['page']) : 1; // page of the result to be returned
    let count = _req['query']['count'] ? parseInt(_req['query']['count']) : '';  // number of result to be returned. If not specified, it will return all records

    return validate(ip)
        .then(() => {
            let aggregateQuery = [
                {
                    $project: {
                        _id: 0,
                        key: 1,
                        createdAt: 1,
                        totalCount: { $sum: '$counts' }
                    }
                },
                {
                    $match: {
                        totalCount: { $gte: ip.minCount, $lte: ip.maxCount },
                        createdAt: { $gte: new Date(ip.startDate), $lte: new Date(ip.endDate) }
                    }
                },
                ...(
                    (count)
                        ? [
                            { $skip: (page - 1) * count },
                            { $limit: count }
                        ]
                        : []
                )
            ];
            return mongoose.model('records').aggregate(aggregateQuery)
                .option({ maxTimeMS: mongoQueryTimeOut, allowDiskUse: true });
        })
        .then(doc => {
            _output['records'] = doc;
            return _res.status(200).json(_output);
        })
        .catch(_err => {
            _output['code'] = 500;
            _output['msg'] = 'error';
            _output['error'] = _err;
            return _res.status(500).json(_output);
        });
}

const validate = (ip) => {
    return new Promise((resolve, reject) => {
        if (isNaN(new Date(ip.startDate).valueOf()) ||
            isNaN(new Date(ip.endDate).valueOf())) {
            return reject('Please pass valid date');
        }
        else return resolve();
    })
}

module.exports = {
    list: list
}