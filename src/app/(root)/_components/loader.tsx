import { Html, useProgress } from '@react-three/drei'

export default function Loader() {
  const { progress } = useProgress()

  return (
    <Html
      as="div"
      center
      style={{
        fontSize: 20,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {progress ? `${progress.toFixed(2)}%` : 'Loading....'}
    </Html>
  )
}
