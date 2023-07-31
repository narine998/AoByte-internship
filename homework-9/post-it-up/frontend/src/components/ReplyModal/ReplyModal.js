import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, CircularProgress } from "@mui/material";

import BackDrop from "../../UI/BackDrop";
import ButtonWrapper from "../../UI/ButtonWrapper";

import useDisableBodyScroll from "../../hooks/UseDisableBodyScroll";

import close from "../../assets/close.png";
import send from "../../assets/send.png";

import styles from "./ReplyModal.module.scss";
import { replyComment } from "../../api/api";

const ReplyComment = ({
  onClose,
  renderReplies,
  updateReplies,
  postId,
  commentId,
}) => {
  const [replyData, setReplyData] = useState("");
  const [sending, setSending] = useState(false);

  const handleReplyDataChange = (e) => {
    setReplyData(e.target.value);
  };

  const sendReply = () => {
    if (replyData.trim()) {
      setSending(true);
      replyComment(postId, commentId, { text: replyData })
        .then((response) => updateReplies(response.data))
        .finally(() => {
          setSending(false);
          setReplyData("");
        });
    }
  };

  // const renderReplies = () => {
  //   if (allReplies) {
  //     return allReplies.map((reply) => <li key={reply.id}>{reply.text}</li>);
  //   }
  // };

  return (
    <div className={styles.modal}>
      <Button onClick={onClose}>
        <img src={close} alt="close" />
      </Button>
      <div className={styles.repliesCont}>
        <ul className={styles.replies}>{renderReplies()}</ul>
        <div className={styles.textBox}>
          <textarea
            value={replyData}
            onChange={(e) => handleReplyDataChange(e)}
            placeholder="Reply..."
          />
          {sending ? (
            <CircularProgress
              color="warning"
              sx={{
                width: "2.4rem",
                position: "absolute",
                top: "14%",
                right: "8%",
              }}
            />
          ) : (
            <ButtonWrapper onClick={sendReply}>
              <img src={send} alt="send" />
            </ButtonWrapper>
          )}
        </div>
      </div>
    </div>
  );
};

function ReplyModal(props) {
  useDisableBodyScroll(true);

  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClick={props.onClose} />,
        document.getElementById("backdrop-container")
      )}
      {ReactDOM.createPortal(
        <ReplyComment {...props} />,

        document.getElementById("modal-container")
      )}
    </>
  );
}

export default ReplyModal;
