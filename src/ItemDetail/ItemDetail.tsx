import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import * as React from 'react'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import LoadingSpinner from '../components/loading/LoadingSpinner'
import ResultItem from '../components/resultItem/ResultItem'
import './ItemDetail.scss'

interface Issue {
    title: string
    bodyHTML: string
    number: number
    labels: { edges: Label[] }
    comments: { edges: [{ node: Comment }] }
}

interface Label {
    node: { name: string; color: string }
}

interface Comment {
    author: { avatarUrl: string; login: string }
    createdAt: string
    bodyHTML: string
}
interface RepositoryData {
    repository: { issue: Issue }
}

const query = (issueId: string) => {
    return gql`
    query {
        repository(owner:"facebook", name:"react") {
            issue(number: ${issueId}) {
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
                comments(first: 20) {
                    edges {
                        node {
                            author {
                                avatarUrl
                                login
                            }
                            createdAt
                            bodyHTML
                        }
                    }
                }
            }
        }
    }
`
}

const commments = (comments: [{ node: Comment }]) => {
    if (comments === undefined || comments.length < 1) {
        return <div className="text-center m-5">Nobody has commented on this issue yet</div>
    } else {
        return comments.map((comment) => (
            <Card key="key" className="comment__container">
                <Card.Header className="comment__header">
                    <img
                        className="comment__user-icon rounded-circle"
                        src={comment.node.author.avatarUrl}
                        alt="userIcon"
                    />
                    <span className="comment__author-name font-weight-bold ">{comment.node.author.login}</span>
                    <span className=""> commented on {new Date(comment.node.createdAt).toDateString()}</span>
                </Card.Header>
                <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: comment.node.bodyHTML }} />
                </Card.Body>
            </Card>
        ))
    }
}

const ItemDetail: React.FunctionComponent = () => {
    const params = useParams<{ id: string }>()
    const { loading, error, data } = useQuery<RepositoryData>(query(params.id))

    if (loading) return <LoadingSpinner />
    if (error) return <p>ERROR {error}</p>
    return (
        <>
            {data?.repository?.issue && (
                <div className="item-detail__container">
                    <ResultItem issue={data?.repository.issue} isDetail={true} />
                    {commments(data.repository.issue.comments.edges)}
                </div>
            )}
        </>
    )
}

export default ItemDetail
