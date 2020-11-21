import React from 'react';
import Moment from 'react-moment';
import { APP_SETTINGS, dateFormat } from '../../../helpers';

const LatestNews = (props) => {

    // eslint-disable-next-line no-undef

    return (
        
         <table className="table-responsive">

            <tbody>
            {props.latestNews.map((news, index) => {
                    return (<tr  key={news.id}>
                        <td style={{width: '260px', cursor: 'pointer'}}>
                            <a href onClick={() => props.onModelClick(news, props.title)}>{news.title.substring(0, 40)}
                                 {news.title.length > 40 ? '...' : ''}
                            </a>
                        </td>
                        <td>{news.author.substring(0, 15)} | {dateFormat(news.date)}</td>
                    </tr>);
            })}


            </tbody>
        </table>
    );
};

export default LatestNews;