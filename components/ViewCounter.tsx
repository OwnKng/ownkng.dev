import { useEffect } from "react"
import useSWR from "swr"

type viewCounterProps = {
  title: string
}

const ViewCounter = ({ title }: viewCounterProps) => {
  const { data } = useSWR(`/api/views/${title}`, async (args) => {
    const res = await fetch(args)
    return res.json()
  })

  const views = data?.views

  useEffect(() => {
    const incrementTracker = () =>
      fetch(`/api/views/${title}`, {
        method: "POST",
      })

    incrementTracker()
  }, [title])

  return <span>{`${views > 0 ? views.toLocaleString() : "–––"} views`}</span>
}

export default ViewCounter
