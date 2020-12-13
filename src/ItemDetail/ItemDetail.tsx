import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import * as React from 'react'
import { useParams } from 'react-router-dom'
import ResultItem from '../components/resultItem/ResultItem';

interface Issue {
    title: string;
    bodyHTML: string;
    number: number;
    labels: {edges: Label[]};
}

interface Label {
    node: {name: string, color: string}
}

interface RepositoryData {
    repository: {issue: Issue}
}

const query = (issueId: string) =>{ return gql`
    query {
        repository(owner:"facebook", name:"react") {
            issue(number: ${issueId}) {
                title
                bodyHTML
                number
                comments(first: 20) {
                    edges {
                        node {
                            author {
                                avatarUrl
                            }
                            bodyText
                        }
                    }
                }
            }
        }
    }
`}

const ItemDetail = () => {
    const  params = useParams<{id: string}>();
    
    const {loading, error, data} = useQuery<RepositoryData>(query(params.id));
    if(loading) return <p>Chotto matte</p>
    if (error) return <p>ERROR {error}</p>
    return(
        data?.repository?.issue && <ResultItem issue={data?.repository.issue} isDetail={true}/>
    )
}

export default ItemDetail