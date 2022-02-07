import { useRouter } from "next/router";

export default function Verify(props) {
  const router = useRouter();
  const { jwt } = router.query;

  return <div>{jwt}</div>;
}
