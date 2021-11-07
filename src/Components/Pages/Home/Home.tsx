import { useState, useEffect } from 'react';
import Styles from "../pages.module.scss"
import { MDBContainer, MDBIcon, MDBModal, MDBModalBody, MDBModalFooter, MDBModalHeader } from 'mdbreact';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import axios from "axios";
const Home = (props: any) => {
  const [allData, setallData] = useState<any[]>([])
  const [datatable, setDatatable] = useState({ columns: [{}], rows: [] });
  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [showViewModal, setshowViewModal] = useState(false);
  const [selectedPost, setselectedPost] = useState<any>()
  useEffect(() => {
    axios.get('http://localhost:3001/posts/')
      .then(res => {
        setallData(res.data)
      })
  }, [])

  useEffect(() => {
    let postsArray = JSON.parse(JSON.stringify(allData));
    postsArray.map((item: any) => {
     return item.action = (
        <div key={item.id} className={Styles.tblActions}>
          <MDBIcon icon="eye" onClick={() => onViewClicked(item)} />
          <Link to={`/Edit/${item.id}`}>
            <MDBIcon far icon="edit" />
          </Link>
          <MDBIcon icon="trash-alt" onClick={() => onDeleteClicked(item)} />
        </div>
      );
    });
    setDatatable({
      columns: [
        {
          label: 'Title',
          field: 'title',
          sort: 'asc',
          width: 150
        },
        {
          label: 'Description',
          field: 'body',
          sort: 'asc',
          width: 270
        },
        {
          label: 'Actions',
          field: 'action',
          sort: 'asc',
          width: 200,
        }
      ],
      rows: postsArray
    });
  }, [allData])

  const onDeleteClicked = (postItem: any) => {
    setshowDeleteModal(true);
    setselectedPost(postItem);
  }
  const deletePost = () => {
    axios.delete(`http://localhost:3001/posts/${selectedPost.id}`)
      .then(response => {
        if (response.status === 200) {
          setshowDeleteModal(false)
        }
      });
    const allDataUpdated = allData.filter((item) => item.id !== selectedPost.id)
    setallData(allDataUpdated)
  }
  const closeDeleteModal = () => {
    setshowDeleteModal(false)
  }
  const onViewClicked = (postItem: any) => {
    setshowViewModal(true);
    setselectedPost(postItem);
  }
  const closeViewModal = () => {
    setshowViewModal(false)
  }

  return (
    <div className={Styles.homePageContainer}>
      <MDBContainer>
        <label>User Posts List</label>
        <div className={Styles.pageContent}>
          <MDBDataTable striped hover searching={true} entriesOptions={[5, 20, 25]} entries={10} pagesAmount={4} data={datatable} />
        </div>
      </MDBContainer>


      <MDBModal isOpen={showDeleteModal} toggle={()=> setshowDeleteModal(!setshowDeleteModal)} >
        <MDBModalHeader>Delete Post</MDBModalHeader>
        <MDBModalBody>
          You want to Delete This Post?
        </MDBModalBody>
        <MDBModalFooter>
          <button className={Styles.submitBtn} onClick={deletePost}>Delete Post</button>
          <button className={Styles.cancelBtn} onClick={closeDeleteModal}>Close</button>

        </MDBModalFooter>
      </MDBModal>

      <MDBModal isOpen={showViewModal} toggle={()=> setshowViewModal(!setshowViewModal)}>
        <MDBModalHeader>{selectedPost?.title}</MDBModalHeader>
        <MDBModalBody>
          <label>Title:</label><div>{selectedPost?.title}</div>
          <label>Description:</label><div>{selectedPost?.body}</div>
        </MDBModalBody>
        <MDBModalFooter>

          <Link to={`/Edit/${selectedPost?.id}`}>
            <button className={Styles.editBtn}>Edit Post</button>
          </Link>
          <button className={Styles.cancelBtn} onClick={closeViewModal}>Close</button>
        </MDBModalFooter>
      </MDBModal>

    </div>
  );
}

export default Home;
