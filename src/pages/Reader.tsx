import { useState } from "react";
import ReadingPane from "../widgets/ReadingPane";
import ReadsList from "../widgets/ReadsList";
import SubscriptionList from "../widgets/SubscriptionList";

export default function ReaderPage() {
  const [currentSubscription, setCurrentSubscription] = useState(null);
  const [currentRead, setCurrentRead] = useState(null);

  return (
    <>
      <SubscriptionList
        currentSubscription={currentSubscription}
        setCurrentSubscription={setCurrentSubscription}
      />
      <ReadsList
        currentSubscription={currentSubscription}
        setCurrentRead={setCurrentRead}
      />
      <ReadingPane currentRead={currentRead} />
    </>
  );
}
