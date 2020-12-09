import * as React from 'react'
import { gql, useQuery } from "@apollo/client";
import ResultItem from './resultItem/ResultItem';
import { RootState } from '../redux/rootReducer';
import { useSelector } from 'react-redux';

const gqlQuery = (searchText: string, issueStatus: IssueStatusQuery) => { 
    return gql`
        query {
          search(first:10, type:ISSUE, query: "${searchText} is:${issueStatus} repo:facebook/react is:ISSUE") {
            issueCount
            edges {
              node {
                ... on Issue {
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
        }
  `
}

type IssueStatusQuery = 'OPEN' | 'CLOSED' | ''
interface SearchData {
    search: {issueCount: string, edges: [{node : Issue}] }
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


const Result = () => {
    function retrieveIssueStatus(status: {open: boolean, closed: boolean}) {
        if (status.open === true && status.closed === false) {
            return 'OPEN'
        } else if (status.open === false && status.closed === true) {
            return 'CLOSED'
        } else return ''
    }
    const searchText = useSelector(
        (state: RootState) => state.searchText
    )
    const statusFilter = useSelector(
        (state: RootState) => state.issueStatus
    )
    const {loading, error, data} = useQuery<SearchData, Issue>(gqlQuery(searchText, retrieveIssueStatus(statusFilter)));

    if(loading) return <p>Chotto matte</p>
    if (error) return <p>ERROR {error}</p>
    return (
        <div className="results__container">
            {
                data?.search?.edges?.map(edge => (
                    <ResultItem issue={edge.node} />
                ))
            }
        </div>
    )
}

export default Result

