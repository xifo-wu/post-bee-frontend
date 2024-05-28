import useSWR from "swr";
import { Badge, Box, Container, Grid, Typography } from "@mui/material";
import CreateMedia from "./components/CreateMedia";
import MediaItem from "./components/MediaItem";

function App() {
  const { data = {}, mutate } = useSWR({
    url: "/api/media",
  });

  const list = data.data || [];

  const handleCreateSuccess = () => {
    mutate();
  };
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          pt: 3,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Badge color="primary" badgeContent={"v0.0.1-beta"}>
          <Box sx={{ pr: 4, pt: 1 }}>POST BEE</Box>
        </Badge>

        <CreateMedia onSuccess={handleCreateSuccess} />
      </Box>

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          {list.map((item: any) => {
            return (
              <Grid item xs={6} md={2} key={item.id}>
                <MediaItem item={item} onSuccess={() => mutate()} />
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
