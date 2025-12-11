import EnvironmentVariables from "./EnvironmentVariables";
import PathParametersClient from "./PathParametersClient";
import QueryParametersClient from "./QueryParametersClient";
import WorkingWithArraysClient from "./WorkingWithArraysClient";
import WorkingWithObjectsClient from "./WorkingWithObjectsClient";
import HttpClient from "./HttpClient";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export default function lab5 () {
    return (
        <div id="wd-lab5">
            <h1>Lab 5</h1>
            <div className="list-group">
                <a href={`${HTTP_SERVER}/lab5/welcome`} className="list-group-item">Welcome</a>
            </div>
            <hr/>
            <EnvironmentVariables/>
            <PathParametersClient/>
            <QueryParametersClient/>
            <WorkingWithObjectsClient/>
            <WorkingWithArraysClient/>
            <HttpClient/>
            <WorkingWithObjectsAsynchronously/>
            <WorkingWithArraysAsynchronously/>
        </div>
    );
}