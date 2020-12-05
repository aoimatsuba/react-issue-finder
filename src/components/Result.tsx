import * as React from 'react'
import { gql, useQuery } from "@apollo/client";

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
            issues(last: 5, states:OPEN) {
                nodes {
                    title
                    bodyText
                } 
            }
        }
    }
`

interface RepositoryData {
    repository: {createdAt: number, issues : {nodes: [Issue]}}
}

interface Issue {
    title: string;
    bodyText: string;
}

function Result() {
    const {loading, error, data} = useQuery<RepositoryData, Issue>(REACT_ISSUES);
    if(loading) return <p>Chotto matte</p>
    if (error) return <p>ERROR {error}</p>
    
    return data?.repository?.issues?.nodes?.map(issue => (
        <>
            <div>TITLE: {issue.title}</div>
            <p></p>
            <div>{issue.bodyText}</div>
            <p>=================================================</p>
        </>
    ))
}

export default Result

