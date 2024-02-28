import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AdminLayout from "@/layouts/AdminLayout";
import { Modal } from "@mui/material";
import CreateTrack from "@/components/admin/createTrack/create";
import CreateArtist from "@/components/admin/createArtist/create";
import CreateAlbum from "@/components/admin/createAlbum/create";

export interface ModalTypeState {
  isAddTrack: boolean;
  isAddArtist: boolean;
  isAddAlbum: boolean;
}

const initialState: ModalTypeState = {
  isAddTrack: false,
  isAddArtist: false,
  isAddAlbum: false,
};

const Index = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(initialState);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openAddTrackModal = () => {
    setModalType({
      ...initialState,
      isAddTrack: true,
    });
    openModal();
  };

  const openAddArtistModal = () => {
    setModalType({
      ...initialState,
      isAddArtist: true,
    });
    openModal();
  };

  const openAddAlbumModal = () => {
    setModalType({
      ...initialState,
      isAddAlbum: true,
    });
    openModal();
  };

  const renderModalContent = () => {
    if (modalType.isAddArtist) {
      return <CreateArtist />;
    }

    if (modalType.isAddTrack) {
      return <CreateTrack />;
    }

    if (modalType.isAddAlbum) {
      return <CreateAlbum />;
    }
    return <>Error no view is defined</>;
  };

  return (
    <AdminLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <h1>admin</h1>
            <div style={{ display: "flex" }}>
              <Button onClick={openAddTrackModal}>Create Track</Button>
              <Button onClick={openAddArtistModal}>Create Artist</Button>

              <Button onClick={openAddAlbumModal}>Create Album</Button>
            </div>
            <Modal
              open={isModalOpen}
              onClose={closeModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <>{renderModalContent()}</>
            </Modal>
          </Box>
        </Card>
      </Grid>
    </AdminLayout>
  );
};

export default Index;
