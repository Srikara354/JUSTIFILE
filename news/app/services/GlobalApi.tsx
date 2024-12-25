
import { create } from 'apisauce';
const api = create({
    baseURL: 'https://newsapi.org/v2',
  }) 
  //https://newsapi.org/v2/everything?q=agriculture&language=en&country=in&apiKey=YOUR_API_KEY
const getNews=api.get('/top-headlines?country=usapiKey=47151991aa5a477a95373fd5b81a12bb')
export default{
    getNews
}