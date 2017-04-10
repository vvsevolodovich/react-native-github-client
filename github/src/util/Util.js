import { Buffer } from 'buffer';

export const encode = (value) => {
    return new Buffer(value).toString('base64');
};