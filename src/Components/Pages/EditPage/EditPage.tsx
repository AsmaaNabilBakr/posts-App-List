import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Styles from "../pages.module.scss"
import { MDBContainer, MDBRow } from 'mdbreact';
import axios from "axios";
const EditPage = (props: any) => {
    const [postDetails, setpostDetails] = useState<any>()
    let navigate = useNavigate();
    let { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`)
            .then(response => {
                setpostDetails(response.data);
            });
    }, [id]);
    const handleChange = (e: any) => {
        const postData = postDetails;
        if (e.target.name === 'title') {
            postData.title = e.target.value;
        } else if (e.target.name === 'body') {
            postData.body = e.target.value;
        }
    }
    const handleSubmit = () => {
        axios.patch(`http://localhost:3001/posts/${id}`, postDetails);
        navigate('/', { replace: true })
    }
    const navigateToHome = () => {
        navigate('/', { replace: true })

    }
    return (
        <div className={Styles.editPageContainer}>
            <MDBContainer>
                <label className={Styles.postTitle}>Edit Post {postDetails?.title}</label>
                <div className={Styles.pageContent}>
                    <form onSubmit={handleSubmit}>
                            <MDBRow>
                                <label>
                                    Title</label>
                                <input placeholder="Title" defaultValue={postDetails?.title} name="title" type="text" onChange={handleChange} />
                            </MDBRow>
                            <MDBRow>
                                <label>
                                    Description</label>
                                <textarea placeholder="Description" defaultValue={postDetails?.body} name="body" onChange={handleChange} />
                            </MDBRow>
                            <MDBRow className={Styles.actionBtns}>
                            <input className={Styles.submitBtn} type="submit" value="Submit" />
                            <button className={Styles.cancelBtn} onClick={navigateToHome}>Cancel</button>
                            </MDBRow>
                    </form>

                </div>
            </MDBContainer>
        </div>
    );
}

export default EditPage;
