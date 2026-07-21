import { Component } from "react";

// Catches errors from lazy-loaded chunks (e.g. a chunk 404s after a new
// deploy invalidates the old build's asset hashes, or a transient network
// blip / ad-blocker breaks the dynamic import). Without this, the rejected
// import() promise throws during render and unmounts the entire app tree
// above the Suspense boundary, producing a blank white page.
class ChunkErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.error("Failed to load a lazy-loaded chunk:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default ChunkErrorBoundary;
