import 'whatwg-fetch';

var config = {
    //api: 'http://localhost:3001/api'
    api: 'http://chspeserver-mbrobertson.rhcloud.com/api'
}

let teachers = {
    get: (callback) => {
        fetch(config.api + '/teacher/').then((response) => {
            return response.json()
        }).then((json) => {
            callback(json);
        });
    },
    image: (teacher) => {
        return "http://res.cloudinary.com/chspe/image/upload/" + teacher.version + teacher._id + ".jpg";
    }
}

config['teachers'] = teachers;

export default config
export { config as Config }
