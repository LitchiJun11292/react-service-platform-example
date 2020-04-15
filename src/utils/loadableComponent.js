/**
 * loadableComponent(动态加载组件)
 */

import React from 'react';

export default function loadableComponent(lazyComponent) {
  // 该组件是动态加载的
  const LazyComponent = React.lazy(()=>import(`@/${lazyComponent}`));

  const Suspense = (props) => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <LazyComponent {...props} />
    </React.Suspense>
  );

  return Suspense;
}
