import React from "react";
import { Box, Typography, Link, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language); // Change the current language
  };

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 1,
        py: 2,
        px: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Box sx={{ mt: 2 }}>
        <Button onClick={() => changeLanguage("en")} color="inherit">
          English
        </Button>
        <Button onClick={() => changeLanguage("es")} color="inherit">
          Español
        </Button>
        <Button onClick={() => changeLanguage("fr")} color="inherit">
          Français
        </Button>
      </Box>
      <Typography variant="body2">{t("footer.copyright")}</Typography>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Link href="#" color="inherit" underline="hover">
          {t("footer.privacy")}
        </Link>
        <Link href="#" color="inherit" underline="hover">
          {t("footer.terms")}
        </Link>
        <Link href="#" color="inherit" underline="hover">
          {t("footer.contact")}
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
