import * as React from 'react'
import { gql, useQuery } from "@apollo/client";
import ResultItem from './ResultItem/ResultItem';

// const TOP_ISSUES = gql`
//     query {
//       search(first: 5, type: ISSUE, query: "repo:facebook/react is:ISSUE") {
//         issueCount
//         edges {
//           node {
//             ... on Issue {
//               title
//               bodyText
//             }
//           }
//         }
//       }
//     }
//   `
const REACT_ISSUES = gql`
    query {
        repository(owner: "facebook", name: "react") {
            issues(last: 10, states:OPEN, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    title
                    bodyText
                    number
                    labels(first: 3) {
                        edges {
                            node {
                                name
                                color
                            }
                        }
                    }
                } 
            }
        }
    }
`

interface RepositoryData {
    repository: {issues : {nodes: [Issue]}}
}

interface Issue {
    title: string;
    bodyText: string;
    number: number;
    labels: {edges: Label[]};
}

interface Label {
    node: {name: string, color: string}
}

function Result() {
    const {loading, error, data} = useQuery<RepositoryData, Issue>(REACT_ISSUES);
    if(loading) return <p>Chotto matte</p>
    if (error) return <p>ERROR {error}</p>
    return data?.repository?.issues?.nodes?.map(issue => (
        <ResultItem issue={issue} />
    ))
}

export default Result

