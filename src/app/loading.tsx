import Skeleton from "@/components/general/Skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  let skeletonCards = Array(16).fill(0);
  return (
    <div className="custom-height my-10 mx-auto flex flex-row flex-wrap justify-center items-center gap-4">
      {skeletonCards.map((index: number) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
}
