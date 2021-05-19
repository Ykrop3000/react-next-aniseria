import React from "react";
import { Dialog, DialogContent, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { USER } from "store/actions/types";
import { signIn } from "src/api";
import styles from "assets/css/authDilog.module.css";
import { useRouter } from "next/router";
import { instance, getMe } from "src/api";

function Auth({
  onClose,
  open,

  user,
  setUser,
  setToken,
  isLogged,

  redirect_uri,
  client_id,
  client_secret,
}) {
  const router = useRouter();
  const code = router.query.code;
  const handleClose = () => {
    onClose();
  };
  const redirect = `https://shikimori.one/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=user_rates+comments+topics`;

  const userController = async () => {
    instance.defaults.headers.common["Authorization"] =
      typeof window != "undefined" && window.document
        ? localStorage.getItem("token")
        : "";

    if (Object.keys(user).length === 0 && isLogged) {
      console.log("getMe");
      getMe()
        .then(({ data }) => {
          if (data) {
            c;
            setUser(data);
          }
        })
        .catch((err) => {
          delete instance.defaults.headers.common["Authorization"];
          localStorage.removeItem("token");
        });
    }
  };

  React.useEffect(() => {
    if (isLogged) userController();
  }, [isLogged]);

  React.useEffect(async () => {
    if (code) {
      let params = {
        grant_type: "authorization_code",
        client_id: client_id,
        client_secret: client_secret,
        code: code,
        redirect_uri: redirect_uri,
      };
      const token = await signIn(params);
      setToken(token);
      router.push({ query: {} });
    }
  }, []);

  const handleSubmitLogin = () => {
    window.location.href = redirect;
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogContent
        className={styles.dilog}
        style={{ padding: 0, marginTop: "-28px", overflowY: "inherit" }}
      >
        <div className={styles.wrap}>
          <div className={styles.title}>
            <Typography variant="h5" gutterBottom className={styles.title_text}>
              Войти в аккаунт
            </Typography>
          </div>
          <div className={styles.form}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={handleSubmitLogin}
              disableElevation
              style={{
                marginTop: "16px",
                marginBottom: "3px",
              }}
            >
              Войти через Shikamori
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  client_id: state.constant.client_id,
  client_secret: state.constant.client_secret,
  redirect_uri: state.constant.redirect_uri,
  user: state.user.user,
  isLogged: state.user.isLogged,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (payload) => dispatch({ type: "USER", payload }),
    setToken: (payload) => dispatch({ type: "TOKEN", payload }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
