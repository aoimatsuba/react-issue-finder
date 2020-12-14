import * as React from 'react'
import { gql, useQuery } from "@apollo/client";
import ResultItem from './resultItem/ResultItem';
import { RootState } from '../redux/rootReducer';
import { useSelector } from 'react-redux';
import LoadingSpinner from './Loading/LoadingSpinner';

const gqlQuery = (searchText: string, issueStatus: IssueStatusQuery) => { 
    return gql`
        query {
          search(first:10, type:ISSUE, query: "${searchText} is:${issueStatus} repo:facebook/react is:ISSUE") {
            issueCount
            edges {
              node {
                ... on Issue {
                  title
                  bodyHTML
                  number
                    labels(first: 5) {
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
    bodyHTML: string;
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
    const {loading, error, data} = useQuery<SearchData>(gqlQuery(searchText, retrieveIssueStatus(statusFilter)));

    if(loading) return <LoadingSpinner/>
    if (error) return <p>ERROR {error}</p>

    if (data?.search?.edges === undefined || data?.search?.edges.length < 1) {
        return (
            <div className="text-center m-5">No results matched your search.</div>
        )
    } else {
    return (
        <div className="results__container">
            {
                data?.search?.edges?.map(edge => (
                    <ResultItem issue={edge.node} isDetail={false} />
                ))
            }
        </div>
    )}
}

export default Result

