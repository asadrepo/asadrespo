import React from 'react';
import {dateFormat} from "../../../helpers";

const BlogNews = (props) => {
    return (
        <table className="table-responsive">
            <tbody>
            {props.blogNews.map((news, index) => {
                return (<tr  key={index}>
                    <td><a href={news.link} target="_blank" rel="noopener noreferrer">{news.title.substring(0, 40)}{news.title.length > 40 ? '...' : ''}</a></td>
                    <td>{news.author.substring(0, 15)} | {dateFormat(news.date)}</td>
                </tr>);
            })}
            </tbody>
        </table>
    );
};

export default BlogNews;
