const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    INCIDENT_NUMBER:String,
    OFFENSE_CODE:String,
    OFFENSE_CODE_GROUP:String,
    OFFENSE_DESCRIPTION:String,
    DISTRICT:String,
    REPORTING_AREA:String,
    SHOOTING:String,
    OCCURRED_ON_DATE:String,
    YEAR:String,
    MONTH:String,
    DAY_OF_WEEK:String,
    HOUR:String,
    UCR_PART:String,
    STREET:String,
    Lat:String,
    Long:String,
    Location:String
});

const crimes = mongoose.model('crimes', schema);
