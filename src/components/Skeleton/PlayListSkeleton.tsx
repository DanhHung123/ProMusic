import React from 'react'
import ContentLoader from 'react-content-loader'

export default function PlayListSkeleton() {
  return (
    <>
      <ContentLoader
        width={300}
        height={40}
        backgroundColor="#dadada"
        foregroundColor="#fafafa"
      >
        <rect x="70" y="15" rx="5" ry="5" width="300" height="15" />
        <rect x="70" y="39" rx="5" ry="5" width="220" height="9" />
        <rect x="20" y="10" rx="0" ry="0" width="40" height="40" />
      </ContentLoader>
      <ContentLoader
        width={300}
        height={40}
        backgroundColor="#dadada"
        foregroundColor="#fafafa"
      >
        <rect x="70" y="15" rx="5" ry="5" width="300" height="15" />
        <rect x="70" y="39" rx="5" ry="5" width="220" height="9" />
        <rect x="20" y="10" rx="0" ry="0" width="40" height="40" />
      </ContentLoader>
    </>
  )
}
